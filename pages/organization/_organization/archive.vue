<template>
  <div class="max-w-xl">
    <p class="mb-2">Po potvrzení už není cesty zpět, odeberou se všichni správci, fotka i popis organizace.
      Archivuje se
      název organice a události, které (spolu)pořádala.</p>
    <v-button
      design="alert"
      @click.native="archive"
    >Potvrzuji, archivovat.</v-button>
  </div>
</template>

<script>
import { API, graphqlOperation, Storage } from "aws-amplify";
import VButton from "@/components/atoms/Button";
import { updateOrganization } from "../../../src/graphql/mutations";
import { getOrganization } from "../../../src/graphql/queries";

const getOrg = /* GraphQL */ `
  query getOrganization($id: ID!) {
    getOrganization(id: $id) {
      id
      name
      description
      logo
      links
      creatorID
      admins {
        items {
          id
          userID
          user {
            id
            name
          }
        }
      }
    }
  }
`;

export default {
  async asyncData({ params, redirect, store }) {
    const orgId = params.organization;

    console.log(orgId);

    const userID = store.state.user.sub;

    const { data } = await API.graphql(graphqlOperation(getOrg, { id: orgId }));

    if (userID !== data.getOrganization.creatorID) {
      return redirect("/");
    }

    const organization = data.getOrganization;

    return {
      organizationId: organization.id,
      name: organization.name,
      admins: organization.admins.items.map(item => {
        return { adminId: item.id, ...item.user };
      })
    };
  },
  head() {
    return {
      title: `Archivace organizace`
    };
  },
  components: { VButton },
  methods: {
    async archive() {
      if (this.admins.length !== 0) {
        this.admins.forEach(async admin => {
          try {
            await API.graphql(
              graphqlOperation(deleteAdmin, {
                input: {
                  id: admin.adminId
                }
              })
            );
          } catch (error) {
            this.$toast.error(
              `Jejda, ${admin.name} nebyl odpojen. Raději zkontroluj.`
            );
            console.error(error);
          }
        });
      }

      let response;
      try {
        let input = {
          id: this.organizationId,
          name: `${this.name} [ARCHIVOVÁNA]`,
          description: `Tato organizace pozastavila svoji činnost`,
          links: null,
          tags: null,
          logo: null
        };

        response = await API.graphql(
          graphqlOperation(updateOrganization, {
            input: input
          })
        );
      } catch (error) {
        this.$toast.error("Jejda, nepodařilo se archivovat organizaci");
        console.error(error);
      }

      if (!!response) {
        this.$toast.success(`Archivováno.`);

        this.$router.push(
          `/organization/${response.data.updateOrganization.id}`
        );
      } else {
        this.$toast.error(`Á jéje. `);
      }
    }
  }
};
</script>
