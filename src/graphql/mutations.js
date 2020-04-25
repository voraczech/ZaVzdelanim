/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
        avatar
        bio
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
        avatar
        bio
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
        avatar
        bio
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
export const createOrganization = /* GraphQL */ `
  mutation CreateOrganization(
    $input: CreateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    createOrganization(input: $input, condition: $condition) {
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
          avatar
          bio
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
      owner
    }
  }
`;
export const updateOrganization = /* GraphQL */ `
  mutation UpdateOrganization(
    $input: UpdateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    updateOrganization(input: $input, condition: $condition) {
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
          avatar
          bio
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
      owner
    }
  }
`;
export const deleteOrganization = /* GraphQL */ `
  mutation DeleteOrganization(
    $input: DeleteOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    deleteOrganization(input: $input, condition: $condition) {
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
          avatar
          bio
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
      owner
    }
  }
`;
export const createSpeaker = /* GraphQL */ `
  mutation CreateSpeaker(
    $input: CreateSpeakerInput!
    $condition: ModelSpeakerConditionInput
  ) {
    createSpeaker(input: $input, condition: $condition) {
      id
      name
      avatar
      bio
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
export const updateSpeaker = /* GraphQL */ `
  mutation UpdateSpeaker(
    $input: UpdateSpeakerInput!
    $condition: ModelSpeakerConditionInput
  ) {
    updateSpeaker(input: $input, condition: $condition) {
      id
      name
      avatar
      bio
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
export const deleteSpeaker = /* GraphQL */ `
  mutation DeleteSpeaker(
    $input: DeleteSpeakerInput!
    $condition: ModelSpeakerConditionInput
  ) {
    deleteSpeaker(input: $input, condition: $condition) {
      id
      name
      avatar
      bio
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
export const createAdmin = /* GraphQL */ `
  mutation CreateAdmin(
    $input: CreateAdminInput!
    $condition: ModelAdminConditionInput
  ) {
    createAdmin(input: $input, condition: $condition) {
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
        }
        description
        logo
        links
        host {
          nextToken
        }
        admins {
          nextToken
        }
        followers {
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
          avatar
          bio
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
export const updateAdmin = /* GraphQL */ `
  mutation UpdateAdmin(
    $input: UpdateAdminInput!
    $condition: ModelAdminConditionInput
  ) {
    updateAdmin(input: $input, condition: $condition) {
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
        }
        description
        logo
        links
        host {
          nextToken
        }
        admins {
          nextToken
        }
        followers {
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
          avatar
          bio
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
export const deleteAdmin = /* GraphQL */ `
  mutation DeleteAdmin(
    $input: DeleteAdminInput!
    $condition: ModelAdminConditionInput
  ) {
    deleteAdmin(input: $input, condition: $condition) {
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
        }
        description
        logo
        links
        host {
          nextToken
        }
        admins {
          nextToken
        }
        followers {
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
          avatar
          bio
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
export const createAttendence = /* GraphQL */ `
  mutation CreateAttendence(
    $input: CreateAttendenceInput!
    $condition: ModelAttendenceConditionInput
  ) {
    createAttendence(input: $input, condition: $condition) {
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
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
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
export const updateAttendence = /* GraphQL */ `
  mutation UpdateAttendence(
    $input: UpdateAttendenceInput!
    $condition: ModelAttendenceConditionInput
  ) {
    updateAttendence(input: $input, condition: $condition) {
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
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
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
export const deleteAttendence = /* GraphQL */ `
  mutation DeleteAttendence(
    $input: DeleteAttendenceInput!
    $condition: ModelAttendenceConditionInput
  ) {
    deleteAttendence(input: $input, condition: $condition) {
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
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
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
export const createHost = /* GraphQL */ `
  mutation CreateHost(
    $input: CreateHostInput!
    $condition: ModelHostConditionInput
  ) {
    createHost(input: $input, condition: $condition) {
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
        }
        description
        logo
        links
        host {
          nextToken
        }
        admins {
          nextToken
        }
        followers {
          nextToken
        }
        owner
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
export const updateHost = /* GraphQL */ `
  mutation UpdateHost(
    $input: UpdateHostInput!
    $condition: ModelHostConditionInput
  ) {
    updateHost(input: $input, condition: $condition) {
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
        }
        description
        logo
        links
        host {
          nextToken
        }
        admins {
          nextToken
        }
        followers {
          nextToken
        }
        owner
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
export const deleteHost = /* GraphQL */ `
  mutation DeleteHost(
    $input: DeleteHostInput!
    $condition: ModelHostConditionInput
  ) {
    deleteHost(input: $input, condition: $condition) {
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
        }
        description
        logo
        links
        host {
          nextToken
        }
        admins {
          nextToken
        }
        followers {
          nextToken
        }
        owner
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
export const createSpeaking = /* GraphQL */ `
  mutation CreateSpeaking(
    $input: CreateSpeakingInput!
    $condition: ModelSpeakingConditionInput
  ) {
    createSpeaking(input: $input, condition: $condition) {
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
export const updateSpeaking = /* GraphQL */ `
  mutation UpdateSpeaking(
    $input: UpdateSpeakingInput!
    $condition: ModelSpeakingConditionInput
  ) {
    updateSpeaking(input: $input, condition: $condition) {
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
export const deleteSpeaking = /* GraphQL */ `
  mutation DeleteSpeaking(
    $input: DeleteSpeakingInput!
    $condition: ModelSpeakingConditionInput
  ) {
    deleteSpeaking(input: $input, condition: $condition) {
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
export const createSpeakerFollower = /* GraphQL */ `
  mutation CreateSpeakerFollower(
    $input: CreateSpeakerFollowerInput!
    $condition: ModelSpeakerFollowerConditionInput
  ) {
    createSpeakerFollower(input: $input, condition: $condition) {
      id
      userID
      speakerID
      user {
        id
        cognitoId
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
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
export const updateSpeakerFollower = /* GraphQL */ `
  mutation UpdateSpeakerFollower(
    $input: UpdateSpeakerFollowerInput!
    $condition: ModelSpeakerFollowerConditionInput
  ) {
    updateSpeakerFollower(input: $input, condition: $condition) {
      id
      userID
      speakerID
      user {
        id
        cognitoId
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
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
export const deleteSpeakerFollower = /* GraphQL */ `
  mutation DeleteSpeakerFollower(
    $input: DeleteSpeakerFollowerInput!
    $condition: ModelSpeakerFollowerConditionInput
  ) {
    deleteSpeakerFollower(input: $input, condition: $condition) {
      id
      userID
      speakerID
      user {
        id
        cognitoId
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
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
export const createOrgFollower = /* GraphQL */ `
  mutation CreateOrgFollower(
    $input: CreateOrgFollowerInput!
    $condition: ModelOrgFollowerConditionInput
  ) {
    createOrgFollower(input: $input, condition: $condition) {
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
        }
        description
        logo
        links
        host {
          nextToken
        }
        admins {
          nextToken
        }
        followers {
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
          avatar
          bio
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
export const updateOrgFollower = /* GraphQL */ `
  mutation UpdateOrgFollower(
    $input: UpdateOrgFollowerInput!
    $condition: ModelOrgFollowerConditionInput
  ) {
    updateOrgFollower(input: $input, condition: $condition) {
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
        }
        description
        logo
        links
        host {
          nextToken
        }
        admins {
          nextToken
        }
        followers {
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
          avatar
          bio
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
export const deleteOrgFollower = /* GraphQL */ `
  mutation DeleteOrgFollower(
    $input: DeleteOrgFollowerInput!
    $condition: ModelOrgFollowerConditionInput
  ) {
    deleteOrgFollower(input: $input, condition: $condition) {
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
        }
        description
        logo
        links
        host {
          nextToken
        }
        admins {
          nextToken
        }
        followers {
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
          avatar
          bio
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
