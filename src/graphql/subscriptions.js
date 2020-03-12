/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
      id
      title
      description
      host {
        id
        organization {
          id
          name
        }
        event {
          id
          title
          description
        }
      }
      attendence {
        id
        event {
          id
          title
          description
        }
        user {
          id
          cognitoId
        }
      }
      speaking {
        id
        speaker {
          id
          name
        }
        event {
          id
          title
          description
        }
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
      host {
        id
        organization {
          id
          name
        }
        event {
          id
          title
          description
        }
      }
      attendence {
        id
        event {
          id
          title
          description
        }
        user {
          id
          cognitoId
        }
      }
      speaking {
        id
        speaker {
          id
          name
        }
        event {
          id
          title
          description
        }
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
      host {
        id
        organization {
          id
          name
        }
        event {
          id
          title
          description
        }
      }
      attendence {
        id
        event {
          id
          title
          description
        }
        user {
          id
          cognitoId
        }
      }
      speaking {
        id
        speaker {
          id
          name
        }
        event {
          id
          title
          description
        }
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
        id
        event {
          id
          title
          description
        }
        user {
          id
          cognitoId
        }
      }
      organizations {
        id
        organization {
          id
          name
        }
        user {
          id
          cognitoId
        }
      }
      speaker {
        id
        name
        speaking {
          id
        }
        user {
          id
          cognitoId
        }
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
        id
        event {
          id
          title
          description
        }
        user {
          id
          cognitoId
        }
      }
      organizations {
        id
        organization {
          id
          name
        }
        user {
          id
          cognitoId
        }
      }
      speaker {
        id
        name
        speaking {
          id
        }
        user {
          id
          cognitoId
        }
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
        id
        event {
          id
          title
          description
        }
        user {
          id
          cognitoId
        }
      }
      organizations {
        id
        organization {
          id
          name
        }
        user {
          id
          cognitoId
        }
      }
      speaker {
        id
        name
        speaking {
          id
        }
        user {
          id
          cognitoId
        }
      }
    }
  }
`;
export const onCreateOrganization = /* GraphQL */ `
  subscription OnCreateOrganization {
    onCreateOrganization {
      id
      name
      owner {
        id
        organization {
          id
          name
        }
        user {
          id
          cognitoId
        }
      }
      host {
        id
        organization {
          id
          name
        }
        event {
          id
          title
          description
        }
      }
    }
  }
`;
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization {
    onUpdateOrganization {
      id
      name
      owner {
        id
        organization {
          id
          name
        }
        user {
          id
          cognitoId
        }
      }
      host {
        id
        organization {
          id
          name
        }
        event {
          id
          title
          description
        }
      }
    }
  }
`;
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization {
    onDeleteOrganization {
      id
      name
      owner {
        id
        organization {
          id
          name
        }
        user {
          id
          cognitoId
        }
      }
      host {
        id
        organization {
          id
          name
        }
        event {
          id
          title
          description
        }
      }
    }
  }
`;
export const onCreateSpeaker = /* GraphQL */ `
  subscription OnCreateSpeaker {
    onCreateSpeaker {
      id
      name
      speaking {
        id
        speaker {
          id
          name
        }
        event {
          id
          title
          description
        }
      }
      user {
        id
        cognitoId
        attendence {
          id
        }
        organizations {
          id
        }
        speaker {
          id
          name
        }
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
        id
        speaker {
          id
          name
        }
        event {
          id
          title
          description
        }
      }
      user {
        id
        cognitoId
        attendence {
          id
        }
        organizations {
          id
        }
        speaker {
          id
          name
        }
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
        id
        speaker {
          id
          name
        }
        event {
          id
          title
          description
        }
      }
      user {
        id
        cognitoId
        attendence {
          id
        }
        organizations {
          id
        }
        speaker {
          id
          name
        }
      }
    }
  }
`;
export const onCreateAttendence = /* GraphQL */ `
  subscription OnCreateAttendence {
    onCreateAttendence {
      id
      event {
        id
        title
        description
        host {
          id
        }
        attendence {
          id
        }
        speaking {
          id
        }
      }
      user {
        id
        cognitoId
        attendence {
          id
        }
        organizations {
          id
        }
        speaker {
          id
          name
        }
      }
    }
  }
`;
export const onUpdateAttendence = /* GraphQL */ `
  subscription OnUpdateAttendence {
    onUpdateAttendence {
      id
      event {
        id
        title
        description
        host {
          id
        }
        attendence {
          id
        }
        speaking {
          id
        }
      }
      user {
        id
        cognitoId
        attendence {
          id
        }
        organizations {
          id
        }
        speaker {
          id
          name
        }
      }
    }
  }
`;
export const onDeleteAttendence = /* GraphQL */ `
  subscription OnDeleteAttendence {
    onDeleteAttendence {
      id
      event {
        id
        title
        description
        host {
          id
        }
        attendence {
          id
        }
        speaking {
          id
        }
      }
      user {
        id
        cognitoId
        attendence {
          id
        }
        organizations {
          id
        }
        speaker {
          id
          name
        }
      }
    }
  }
`;
export const onCreateOwner = /* GraphQL */ `
  subscription OnCreateOwner {
    onCreateOwner {
      id
      organization {
        id
        name
        owner {
          id
        }
        host {
          id
        }
      }
      user {
        id
        cognitoId
        attendence {
          id
        }
        organizations {
          id
        }
        speaker {
          id
          name
        }
      }
    }
  }
`;
export const onUpdateOwner = /* GraphQL */ `
  subscription OnUpdateOwner {
    onUpdateOwner {
      id
      organization {
        id
        name
        owner {
          id
        }
        host {
          id
        }
      }
      user {
        id
        cognitoId
        attendence {
          id
        }
        organizations {
          id
        }
        speaker {
          id
          name
        }
      }
    }
  }
`;
export const onDeleteOwner = /* GraphQL */ `
  subscription OnDeleteOwner {
    onDeleteOwner {
      id
      organization {
        id
        name
        owner {
          id
        }
        host {
          id
        }
      }
      user {
        id
        cognitoId
        attendence {
          id
        }
        organizations {
          id
        }
        speaker {
          id
          name
        }
      }
    }
  }
`;
export const onCreateHost = /* GraphQL */ `
  subscription OnCreateHost {
    onCreateHost {
      id
      organization {
        id
        name
        owner {
          id
        }
        host {
          id
        }
      }
      event {
        id
        title
        description
        host {
          id
        }
        attendence {
          id
        }
        speaking {
          id
        }
      }
    }
  }
`;
export const onUpdateHost = /* GraphQL */ `
  subscription OnUpdateHost {
    onUpdateHost {
      id
      organization {
        id
        name
        owner {
          id
        }
        host {
          id
        }
      }
      event {
        id
        title
        description
        host {
          id
        }
        attendence {
          id
        }
        speaking {
          id
        }
      }
    }
  }
`;
export const onDeleteHost = /* GraphQL */ `
  subscription OnDeleteHost {
    onDeleteHost {
      id
      organization {
        id
        name
        owner {
          id
        }
        host {
          id
        }
      }
      event {
        id
        title
        description
        host {
          id
        }
        attendence {
          id
        }
        speaking {
          id
        }
      }
    }
  }
`;
export const onCreateSpeaking = /* GraphQL */ `
  subscription OnCreateSpeaking {
    onCreateSpeaking {
      id
      speaker {
        id
        name
        speaking {
          id
        }
        user {
          id
          cognitoId
        }
      }
      event {
        id
        title
        description
        host {
          id
        }
        attendence {
          id
        }
        speaking {
          id
        }
      }
    }
  }
`;
export const onUpdateSpeaking = /* GraphQL */ `
  subscription OnUpdateSpeaking {
    onUpdateSpeaking {
      id
      speaker {
        id
        name
        speaking {
          id
        }
        user {
          id
          cognitoId
        }
      }
      event {
        id
        title
        description
        host {
          id
        }
        attendence {
          id
        }
        speaking {
          id
        }
      }
    }
  }
`;
export const onDeleteSpeaking = /* GraphQL */ `
  subscription OnDeleteSpeaking {
    onDeleteSpeaking {
      id
      speaker {
        id
        name
        speaking {
          id
        }
        user {
          id
          cognitoId
        }
      }
      event {
        id
        title
        description
        host {
          id
        }
        attendence {
          id
        }
        speaking {
          id
        }
      }
    }
  }
`;
