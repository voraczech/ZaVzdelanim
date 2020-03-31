/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
      id
      title
      description
      date
      place
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
      place
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
      place
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
        speaking {
          nextToken
        }
      }
      speakerID
      creator {
        items {
          id
          name
          creatorID
          description
          links
          owner
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
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      cognitoId
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
        speaking {
          nextToken
        }
      }
      speakerID
      creator {
        items {
          id
          name
          creatorID
          description
          links
          owner
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
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      cognitoId
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
        speaking {
          nextToken
        }
      }
      speakerID
      creator {
        items {
          id
          name
          creatorID
          description
          links
          owner
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
    }
  }
`;
export const onCreateOrganization = /* GraphQL */ `
  subscription OnCreateOrganization($owner: String!) {
    onCreateOrganization(owner: $owner) {
      id
      name
      creatorID
      creator {
        id
        cognitoId
        attendence {
          nextToken
        }
        speaker {
          id
          name
        }
        speakerID
        creator {
          nextToken
        }
        admin {
          nextToken
        }
      }
      description
      links
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
      owner
    }
  }
`;
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization($owner: String!, $admins: String!) {
    onUpdateOrganization(owner: $owner, admins: $admins) {
      id
      name
      creatorID
      creator {
        id
        cognitoId
        attendence {
          nextToken
        }
        speaker {
          id
          name
        }
        speakerID
        creator {
          nextToken
        }
        admin {
          nextToken
        }
      }
      description
      links
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
      owner
    }
  }
`;
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization($owner: String!) {
    onDeleteOrganization(owner: $owner) {
      id
      name
      creatorID
      creator {
        id
        cognitoId
        attendence {
          nextToken
        }
        speaker {
          id
          name
        }
        speakerID
        creator {
          nextToken
        }
        admin {
          nextToken
        }
      }
      description
      links
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
      owner
    }
  }
`;
export const onCreateSpeaker = /* GraphQL */ `
  subscription OnCreateSpeaker {
    onCreateSpeaker {
      id
      name
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
export const onUpdateSpeaker = /* GraphQL */ `
  subscription OnUpdateSpeaker {
    onUpdateSpeaker {
      id
      name
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
export const onDeleteSpeaker = /* GraphQL */ `
  subscription OnDeleteSpeaker {
    onDeleteSpeaker {
      id
      name
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
          speakerID
        }
        description
        links
        host {
          nextToken
        }
        admins {
          nextToken
        }
        owner
      }
      user {
        id
        cognitoId
        attendence {
          nextToken
        }
        speaker {
          id
          name
        }
        speakerID
        creator {
          nextToken
        }
        admin {
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
          speakerID
        }
        description
        links
        host {
          nextToken
        }
        admins {
          nextToken
        }
        owner
      }
      user {
        id
        cognitoId
        attendence {
          nextToken
        }
        speaker {
          id
          name
        }
        speakerID
        creator {
          nextToken
        }
        admin {
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
          speakerID
        }
        description
        links
        host {
          nextToken
        }
        admins {
          nextToken
        }
        owner
      }
      user {
        id
        cognitoId
        attendence {
          nextToken
        }
        speaker {
          id
          name
        }
        speakerID
        creator {
          nextToken
        }
        admin {
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
        place
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
        attendence {
          nextToken
        }
        speaker {
          id
          name
        }
        speakerID
        creator {
          nextToken
        }
        admin {
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
        place
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
        attendence {
          nextToken
        }
        speaker {
          id
          name
        }
        speakerID
        creator {
          nextToken
        }
        admin {
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
        place
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
        attendence {
          nextToken
        }
        speaker {
          id
          name
        }
        speakerID
        creator {
          nextToken
        }
        admin {
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
          speakerID
        }
        description
        links
        host {
          nextToken
        }
        admins {
          nextToken
        }
        owner
      }
      event {
        id
        title
        description
        date
        place
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
          speakerID
        }
        description
        links
        host {
          nextToken
        }
        admins {
          nextToken
        }
        owner
      }
      event {
        id
        title
        description
        date
        place
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
          speakerID
        }
        description
        links
        host {
          nextToken
        }
        admins {
          nextToken
        }
        owner
      }
      event {
        id
        title
        description
        date
        place
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
        place
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
        speaking {
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
        place
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
        speaking {
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
        place
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
        speaking {
          nextToken
        }
      }
    }
  }
`;
