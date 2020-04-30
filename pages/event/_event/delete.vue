<template>
  <div class="max-w-xl">
    <p class="mb-2">Po potvrzení už není cesty zpět.</p>
    <v-button
      design="alert"
      @click.native="del"
    >Potvrzuji, odstranit.</v-button>
  </div>
</template>

<script>
import { API, graphqlOperation, Storage } from "aws-amplify";
import VButton from "@/components/atoms/Button";

const getEvent = /* GraphQL */ `
  query getEvent($id: ID!, $userID: ID) {
    getEvent(id: $id) {
      id
      attendence {
        items {
          id
        }
      }
      host {
        items {
          id
          organization {
            id
            creatorID
            admins(userID: { eq: $userID }) {
              items {
                id
              }
            }
          }
        }
      }
      speaking {
        items {
          id
        }
      }
    }
  }
`;

// must create custom mutation because of batching problems
const deleteAttendence = /* GraphQL */ `
  mutation deleteAttendence($id: ID!) {
    deleteAttendence(input: { id: $id }) {
      id
    }
  }
`;
const deleteSpeaking = /* GraphQL */ `
  mutation deleteSpeaking($id: ID!) {
    deleteSpeaking(input: { id: $id }) {
      id
    }
  }
`;
const deleteHost = /* GraphQL */ `
  mutation deleteHost($id: ID!) {
    deleteHost(input: { id: $id }) {
      id
    }
  }
`;
const deleteEvent = /* GraphQL */ `
  mutation deleteEvent($id: ID!) {
    deleteEvent(input: { id: $id }) {
      id
    }
  }
`;

export default {
  async asyncData({ params, redirect, store }) {
    const eventID = params.event;

    const userID = store.state.user.sub;

    const { data } = await API.graphql(
      graphqlOperation(getEvent, { id: eventID, userID: userID })
    );

    let canAcces = false;

    data.getEvent.host.items.forEach(host => {
      if (userID === host.organization.creatorID) {
        canAcces = true;
      }

      host.organization.admins.items.forEach(admins => {
        if (userID === admins.admin.id) {
          canAcces = true;
        }
      });
    });

    if (!canAcces) {
      return redirect("/");
    }

    const event = data.getEvent;

    return {
      eventID: data.getEvent.id,
      attendence: event.attendence.items,
      speaking: event.speaking.items,
      hosts: event.host.items
    };
  },

  components: { VButton },
  methods: {
    async del() {
      // delete attendence
      if (this.attendence.length !== 0) {
        this.attendence.forEach(async attendence => {
          try {
            await API.graphql(
              graphqlOperation(deleteAttendence, {
                id: attendence.id
              })
            );
          } catch (error) {
            this.$toast.error(`Jejda, nešlo odstranit účast.`);
            console.error(error);
          }
        });
      }

      // delete speakers
      if (this.speaking.length !== 0) {
        this.speaking.forEach(async speaking => {
          try {
            await API.graphql(
              graphqlOperation(deleteSpeaking, {
                id: speaking.id
              })
            );
          } catch (error) {
            this.$toast.error(`Jejda, nešlo odstranit přednášející.`);
            console.error(error);
          }
        });
      }

      // delete hosts
      this.hosts.forEach(async host => {
        try {
          await API.graphql(
            graphqlOperation(deleteHost, {
              id: host.id
            })
          );
        } catch (error) {
          this.$toast.error(`Jejda, nešlo odstranit hostitele.`);
          console.error(error);
        }
      });

      // delete event
      try {
        await API.graphql(
          graphqlOperation(deleteEvent, {
            id: this.eventID
          })
        );

        this.$toast.success(`Odstraněno`);
        this.$router.push(`/`);
      } catch (error) {
        this.$toast.error(`Jejda, nešlo odstranit událost.`);
        console.error(error);
      }
    }
  }
};
</script>
