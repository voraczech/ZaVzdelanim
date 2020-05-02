/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
      id
      title
      description
      date
      dateEnd
      place
      image
      tags
      video
      link
      host {
        items {
          id
          organizationID
          eventID
        }
        nextToken
      }
      attendence {
        items {
          id
          eventID
          userID
        }
        nextToken
      }
      speaking {
        items {
          id
          eventID
          speakerID
        }
        nextToken
      }
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
      id
      title
      description
      date
      dateEnd
      place
      image
      tags
      video
      link
      host {
        items {
          id
          organizationID
          eventID
        }
        nextToken
      }
      attendence {
        items {
          id
          eventID
          userID
        }
        nextToken
      }
      speaking {
        items {
          id
          eventID
          speakerID
        }
        nextToken
      }
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
      id
      title
      description
      date
      dateEnd
      place
      image
      tags
      video
      link
      host {
        items {
          id
          organizationID
          eventID
        }
        nextToken
      }
      attendence {
        items {
          id
          eventID
          userID
        }
        nextToken
      }
      speaking {
        items {
          id
          eventID
          speakerID
        }
        nextToken
      }
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      cognitoId
      name
      attendence {
        items {
          id
          eventID
          userID
        }
        nextToken
      }
      speaker {
        id
        name
        avatar
        bio
        tags
        links
        speaking {
          nextToken
        }
        followers {
          nextToken
        }
      }
      creator {
        items {
          id
          name
          creatorID
          description
          logo
          links
          tags
        }
        nextToken
      }
      admin {
        items {
          id
          organizationID
          userID
        }
        nextToken
      }
      followOrganization {
        items {
          id
          organizationID
          userID
        }
        nextToken
      }
      followSpeaker {
        items {
          id
          userID
          speakerID
        }
        nextToken
      }
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      cognitoId
      name
      attendence {
        items {
          id
          eventID
          userID
        }
        nextToken
      }
      speaker {
        id
        name
        avatar
        bio
        tags
        links
        speaking {
          nextToken
        }
        followers {
          nextToken
        }
      }
      creator {
        items {
          id
          name
          creatorID
          description
          logo
          links
          tags
        }
        nextToken
      }
      admin {
        items {
          id
          organizationID
          userID
        }
        nextToken
      }
      followOrganization {
        items {
          id
          organizationID
          userID
        }
        nextToken
      }
      followSpeaker {
        items {
          id
          userID
          speakerID
        }
        nextToken
      }
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      cognitoId
      name
      attendence {
        items {
          id
          eventID
          userID
        }
        nextToken
      }
      speaker {
        id
        name
        avatar
        bio
        tags
        links
        speaking {
          nextToken
        }
        followers {
          nextToken
        }
      }
      creator {
        items {
          id
          name
          creatorID
          description
          logo
          links
          tags
        }
        nextToken
      }
      admin {
        items {
          id
          organizationID
          userID
        }
        nextToken
      }
      followOrganization {
        items {
          id
          organizationID
          userID
        }
        nextToken
      }
      followSpeaker {
        items {
          id
          userID
          speakerID
        }
        nextToken
      }
    }
  }
`;
export const onCreateOrganization = /* GraphQL */ `
  subscription OnCreateOrganization {
    onCreateOrganization {
      id
      name
      creatorID
      creator {
        id
        cognitoId
        name
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
          tags
          links
        }
        creator {
          nextToken
        }
        admin {
          nextToken
        }
        followOrganization {
          nextToken
        }
        followSpeaker {
          nextToken
        }
      }
      description
      logo
      links
      tags
      host {
        items {
          id
          organizationID
          eventID
        }
        nextToken
      }
      admins {
        items {
          id
          organizationID
          userID
        }
        nextToken
      }
      followers {
        items {
          id
          organizationID
          userID
        }
        nextToken
      }
    }
  }
`;
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization {
    onUpdateOrganization {
      id
      name
      creatorID
      creator {
        id
        cognitoId
        name
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
          tags
          links
        }
        creator {
          nextToken
        }
        admin {
          nextToken
        }
        followOrganization {
          nextToken
        }
        followSpeaker {
          nextToken
        }
      }
      description
      logo
      links
      tags
      host {
        items {
          id
          organizationID
          eventID
        }
        nextToken
      }
      admins {
        items {
          id
          organizationID
          userID
        }
        nextToken
      }
      followers {
        items {
          id
          organizationID
          userID
        }
        nextToken
      }
    }
  }
`;
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization {
    onDeleteOrganization {
      id
      name
      creatorID
      creator {
        id
        cognitoId
        name
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
          tags
          links
        }
        creator {
          nextToken
        }
        admin {
          nextToken
        }
        followOrganization {
          nextToken
        }
        followSpeaker {
          nextToken
        }
      }
      description
      logo
      links
      tags
      host {
        items {
          id
          organizationID
          eventID
        }
        nextToken
      }
      admins {
        items {
          id
          organizationID
          userID
        }
        nextToken
      }
      followers {
        items {
          id
          organizationID
          userID
        }
        nextToken
      }
    }
  }
`;
export const onCreateSpeaker = /* GraphQL */ `
  subscription OnCreateSpeaker {
    onCreateSpeaker {
      id
      name
      avatar
      bio
      tags
      links
      speaking {
        items {
          id
          eventID
          speakerID
        }
        nextToken
      }
      followers {
        items {
          id
          userID
          speakerID
        }
        nextToken
      }
    }
  }
`;
export const onUpdateSpeaker = /* GraphQL */ `
  subscription OnUpdateSpeaker {
    onUpdateSpeaker {
      id
      name
      avatar
      bio
      tags
      links
      speaking {
        items {
          id
          eventID
          speakerID
        }
        nextToken
      }
      followers {
        items {
          id
          userID
          speakerID
        }
        nextToken
      }
    }
  }
`;
export const onDeleteSpeaker = /* GraphQL */ `
  subscription OnDeleteSpeaker {
    onDeleteSpeaker {
      id
      name
      avatar
      bio
      tags
      links
      speaking {
        items {
          id
          eventID
          speakerID
        }
        nextToken
      }
      followers {
        items {
          id
          userID
          speakerID
        }
        nextToken
      }
    }
  }
`;
export const onCreateAdmin = /* GraphQL */ `
  subscription OnCreateAdmin {
    onCreateAdmin {
      id
      organizationID
      userID
      organization {
        id
        name
        creatorID
        creator {
          id
          cognitoId
          name
        }
        description
        logo
        links
        tags
        host {
          nextToken
        }
        admins {
          nextToken
        }
        followers {
          nextToken
        }
      }
      user {
        id
        cognitoId
        name
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
          tags
          links
        }
        creator {
          nextToken
        }
        admin {
          nextToken
        }
        followOrganization {
          nextToken
        }
        followSpeaker {
          nextToken
        }
      }
    }
  }
`;
export const onUpdateAdmin = /* GraphQL */ `
  subscription OnUpdateAdmin {
    onUpdateAdmin {
      id
      organizationID
      userID
      organization {
        id
        name
        creatorID
        creator {
          id
          cognitoId
          name
        }
        description
        logo
        links
        tags
        host {
          nextToken
        }
        admins {
          nextToken
        }
        followers {
          nextToken
        }
      }
      user {
        id
        cognitoId
        name
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
          tags
          links
        }
        creator {
          nextToken
        }
        admin {
          nextToken
        }
        followOrganization {
          nextToken
        }
        followSpeaker {
          nextToken
        }
      }
    }
  }
`;
export const onDeleteAdmin = /* GraphQL */ `
  subscription OnDeleteAdmin {
    onDeleteAdmin {
      id
      organizationID
      userID
      organization {
        id
        name
        creatorID
        creator {
          id
          cognitoId
          name
        }
        description
        logo
        links
        tags
        host {
          nextToken
        }
        admins {
          nextToken
        }
        followers {
          nextToken
        }
      }
      user {
        id
        cognitoId
        name
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
          tags
          links
        }
        creator {
          nextToken
        }
        admin {
          nextToken
        }
        followOrganization {
          nextToken
        }
        followSpeaker {
          nextToken
        }
      }
    }
  }
`;
export const onCreateAttendence = /* GraphQL */ `
  subscription OnCreateAttendence {
    onCreateAttendence {
      id
      eventID
      userID
      event {
        id
        title
        description
        date
        dateEnd
        place
        image
        tags
        video
        link
        host {
          nextToken
        }
        attendence {
          nextToken
        }
        speaking {
          nextToken
        }
      }
      user {
        id
        cognitoId
        name
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
          tags
          links
        }
        creator {
          nextToken
        }
        admin {
          nextToken
        }
        followOrganization {
          nextToken
        }
        followSpeaker {
          nextToken
        }
      }
    }
  }
`;
export const onUpdateAttendence = /* GraphQL */ `
  subscription OnUpdateAttendence {
    onUpdateAttendence {
      id
      eventID
      userID
      event {
        id
        title
        description
        date
        dateEnd
        place
        image
        tags
        video
        link
        host {
          nextToken
        }
        attendence {
          nextToken
        }
        speaking {
          nextToken
        }
      }
      user {
        id
        cognitoId
        name
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
          tags
          links
        }
        creator {
          nextToken
        }
        admin {
          nextToken
        }
        followOrganization {
          nextToken
        }
        followSpeaker {
          nextToken
        }
      }
    }
  }
`;
export const onDeleteAttendence = /* GraphQL */ `
  subscription OnDeleteAttendence {
    onDeleteAttendence {
      id
      eventID
      userID
      event {
        id
        title
        description
        date
        dateEnd
        place
        image
        tags
        video
        link
        host {
          nextToken
        }
        attendence {
          nextToken
        }
        speaking {
          nextToken
        }
      }
      user {
        id
        cognitoId
        name
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
          tags
          links
        }
        creator {
          nextToken
        }
        admin {
          nextToken
        }
        followOrganization {
          nextToken
        }
        followSpeaker {
          nextToken
        }
      }
    }
  }
`;
export const onCreateHost = /* GraphQL */ `
  subscription OnCreateHost {
    onCreateHost {
      id
      organizationID
      eventID
      organization {
        id
        name
        creatorID
        creator {
          id
          cognitoId
          name
        }
        description
        logo
        links
        tags
        host {
          nextToken
        }
        admins {
          nextToken
        }
        followers {
          nextToken
        }
      }
      event {
        id
        title
        description
        date
        dateEnd
        place
        image
        tags
        video
        link
        host {
          nextToken
        }
        attendence {
          nextToken
        }
        speaking {
          nextToken
        }
      }
    }
  }
`;
export const onUpdateHost = /* GraphQL */ `
  subscription OnUpdateHost {
    onUpdateHost {
      id
      organizationID
      eventID
      organization {
        id
        name
        creatorID
        creator {
          id
          cognitoId
          name
        }
        description
        logo
        links
        tags
        host {
          nextToken
        }
        admins {
          nextToken
        }
        followers {
          nextToken
        }
      }
      event {
        id
        title
        description
        date
        dateEnd
        place
        image
        tags
        video
        link
        host {
          nextToken
        }
        attendence {
          nextToken
        }
        speaking {
          nextToken
        }
      }
    }
  }
`;
export const onDeleteHost = /* GraphQL */ `
  subscription OnDeleteHost {
    onDeleteHost {
      id
      organizationID
      eventID
      organization {
        id
        name
        creatorID
        creator {
          id
          cognitoId
          name
        }
        description
        logo
        links
        tags
        host {
          nextToken
        }
        admins {
          nextToken
        }
        followers {
          nextToken
        }
      }
      event {
        id
        title
        description
        date
        dateEnd
        place
        image
        tags
        video
        link
        host {
          nextToken
        }
        attendence {
          nextToken
        }
        speaking {
          nextToken
        }
      }
    }
  }
`;
export const onCreateSpeaking = /* GraphQL */ `
  subscription OnCreateSpeaking {
    onCreateSpeaking {
      id
      eventID
      speakerID
      event {
        id
        title
        description
        date
        dateEnd
        place
        image
        tags
        video
        link
        host {
          nextToken
        }
        attendence {
          nextToken
        }
        speaking {
          nextToken
        }
      }
      speaker {
        id
        name
        avatar
        bio
        tags
        links
        speaking {
          nextToken
        }
        followers {
          nextToken
        }
      }
    }
  }
`;
export const onUpdateSpeaking = /* GraphQL */ `
  subscription OnUpdateSpeaking {
    onUpdateSpeaking {
      id
      eventID
      speakerID
      event {
        id
        title
        description
        date
        dateEnd
        place
        image
        tags
        video
        link
        host {
          nextToken
        }
        attendence {
          nextToken
        }
        speaking {
          nextToken
        }
      }
      speaker {
        id
        name
        avatar
        bio
        tags
        links
        speaking {
          nextToken
        }
        followers {
          nextToken
        }
      }
    }
  }
`;
export const onDeleteSpeaking = /* GraphQL */ `
  subscription OnDeleteSpeaking {
    onDeleteSpeaking {
      id
      eventID
      speakerID
      event {
        id
        title
        description
        date
        dateEnd
        place
        image
        tags
        video
        link
        host {
          nextToken
        }
        attendence {
          nextToken
        }
        speaking {
          nextToken
        }
      }
      speaker {
        id
        name
        avatar
        bio
        tags
        links
        speaking {
          nextToken
        }
        followers {
          nextToken
        }
      }
    }
  }
`;
export const onCreateSpeakerFollower = /* GraphQL */ `
  subscription OnCreateSpeakerFollower {
    onCreateSpeakerFollower {
      id
      userID
      speakerID
      user {
        id
        cognitoId
        name
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
          tags
          links
        }
        creator {
          nextToken
        }
        admin {
          nextToken
        }
        followOrganization {
          nextToken
        }
        followSpeaker {
          nextToken
        }
      }
      speaker {
        id
        name
        avatar
        bio
        tags
        links
        speaking {
          nextToken
        }
        followers {
          nextToken
        }
      }
    }
  }
`;
export const onUpdateSpeakerFollower = /* GraphQL */ `
  subscription OnUpdateSpeakerFollower {
    onUpdateSpeakerFollower {
      id
      userID
      speakerID
      user {
        id
        cognitoId
        name
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
          tags
          links
        }
        creator {
          nextToken
        }
        admin {
          nextToken
        }
        followOrganization {
          nextToken
        }
        followSpeaker {
          nextToken
        }
      }
      speaker {
        id
        name
        avatar
        bio
        tags
        links
        speaking {
          nextToken
        }
        followers {
          nextToken
        }
      }
    }
  }
`;
export const onDeleteSpeakerFollower = /* GraphQL */ `
  subscription OnDeleteSpeakerFollower {
    onDeleteSpeakerFollower {
      id
      userID
      speakerID
      user {
        id
        cognitoId
        name
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
          tags
          links
        }
        creator {
          nextToken
        }
        admin {
          nextToken
        }
        followOrganization {
          nextToken
        }
        followSpeaker {
          nextToken
        }
      }
      speaker {
        id
        name
        avatar
        bio
        tags
        links
        speaking {
          nextToken
        }
        followers {
          nextToken
        }
      }
    }
  }
`;
export const onCreateOrgFollower = /* GraphQL */ `
  subscription OnCreateOrgFollower {
    onCreateOrgFollower {
      id
      organizationID
      userID
      organization {
        id
        name
        creatorID
        creator {
          id
          cognitoId
          name
        }
        description
        logo
        links
        tags
        host {
          nextToken
        }
        admins {
          nextToken
        }
        followers {
          nextToken
        }
      }
      user {
        id
        cognitoId
        name
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
          tags
          links
        }
        creator {
          nextToken
        }
        admin {
          nextToken
        }
        followOrganization {
          nextToken
        }
        followSpeaker {
          nextToken
        }
      }
    }
  }
`;
export const onUpdateOrgFollower = /* GraphQL */ `
  subscription OnUpdateOrgFollower {
    onUpdateOrgFollower {
      id
      organizationID
      userID
      organization {
        id
        name
        creatorID
        creator {
          id
          cognitoId
          name
        }
        description
        logo
        links
        tags
        host {
          nextToken
        }
        admins {
          nextToken
        }
        followers {
          nextToken
        }
      }
      user {
        id
        cognitoId
        name
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
          tags
          links
        }
        creator {
          nextToken
        }
        admin {
          nextToken
        }
        followOrganization {
          nextToken
        }
        followSpeaker {
          nextToken
        }
      }
    }
  }
`;
export const onDeleteOrgFollower = /* GraphQL */ `
  subscription OnDeleteOrgFollower {
    onDeleteOrgFollower {
      id
      organizationID
      userID
      organization {
        id
        name
        creatorID
        creator {
          id
          cognitoId
          name
        }
        description
        logo
        links
        tags
        host {
          nextToken
        }
        admins {
          nextToken
        }
        followers {
          nextToken
        }
      }
      user {
        id
        cognitoId
        name
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
          tags
          links
        }
        creator {
          nextToken
        }
        admin {
          nextToken
        }
        followOrganization {
          nextToken
        }
        followSpeaker {
          nextToken
        }
      }
    }
  }
`;
