export const userTypeDefs = `#graphql
    scalar Date
    enum RoleTypes {
        ADMIN
        DRIVER
        RIDER
        SUBADMIN
        BANNED
    }
    enum StatusTypes {
        PENDING
        WAITING
        APPROVED
        REJECTED
    }   
    type User {
        _id: ID!
        createdAt: Date                    
        userName: String
        email: String
        resetPassword: ResetPasswordTypes
        avatarURL: String        
        license: LicenseTypes
        role: RoleTypes
        driverRequests: [String]
        workingDays: [Int]
        workingTime: WorkingTimeTypes
        phone: PhoneTypes
        coordinates: DriverCoordinates         
    }
    type Driver {
        _id: ID!
        userName: String
        avatarURL: String
        phone: PhoneTypes
        workingDays: [Int]
        workingTime: WorkingTimeTypes
        coordinates: DriverCoordinates
    }
    type DriverWithRating {
        driver: Driver
        rating: Float
    }
    type ResetPasswordTypes {
        token: String
        expire: Date
        changed: Date
    }
    type LicenseTypes {
        url: [String]
        message: String
        status: StatusTypes
    }
    type WorkingTimeTypes {
        from: Int
        to: Int
    }
    type PhoneTypes {
        number: String
        confirmed: Boolean
    }
    type DriverCoordinates {
        lat: Float
        lon: Float
    }
    type UserWithToken {
        user: User        
        token: String
        message: String              
    }
    type UserWithMessage {
        user: User        
        message: String              
    }   
    type UserDeleteResponse {        
        userStatus: UserDeleteStatus
        message: String
    }
    type UserDeleteStatus { 
        acknowledged: Boolean
        deletedCount: Int
    }
    type UserPasswordResponse {
        status: Boolean
        message: String
    }       
    
    input GetFreeDriversInput {
        requestedTime: Date
    }
    input RegisterUserInput {        
        userName: String!
        email: String!
        password: String!
        role: RoleTypes               
    }
    input LoginByPhoneInput {
        phone: String!
        smsCode: String!
    }
    input ChangePasswordInput {
        currentPassword: String!
        password: String!
    }
    input UserSetPasswordInput {
        token: String!
        password: String!
    }
    input UpdateWorkingTimeInput {
        workingDays: [Int]
        workingTime: WorkingTimeInput
    }
    input WorkingTimeInput {
        from: Int
        to: Int
    }
    input ChangeUserRoleInput {
        id: ID!
        role: String
    }
    input AnswerDriverLicense {
        id: ID!
        answer: Boolean
    }
    input UpdateCoordinatesInput {
        coordinates: DriverCoordinatesInput
    }
    input DriverCoordinatesInput {
        lat: Float
        lon: Float
    }

    type Query {
        getUserByToken: User        
        getFreeDrivers(getFreeDriversInput: GetFreeDriversInput): [DriverWithRating]
        getDriverProfile(id: ID!): User   
        getRiderProfile(id: ID!): User

        getAllDrivers: [User]
        getAllRiders: [User]
        getAllUsers: [User]
        getAllLicenses: [User]
    }
    type Mutation {
        registerByEmail(registerUserInput: RegisterUserInput): UserWithToken        
        loginByEmail(email: String!, password: String!): UserWithToken

        registerByPhone(phone: String!): UserWithMessage        
        loginByPhone(loginByPhoneInput: LoginByPhoneInput): UserWithToken

        addMobilePhone(phone: String!): User
        confirmMobilePhone(smsCode: String!): User

        changePassword(changePasswordInput: ChangePasswordInput): UserPasswordResponse
        resetPassword(email: String!): UserPasswordResponse
        setNewPassword(setPasswordInput: UserSetPasswordInput): UserPasswordResponse

        deleteUser(_id: ID!): UserDeleteResponse
        updateWorkingTime(updateWorkingTimeInput: UpdateWorkingTimeInput): User
        sendLicenseForApprove: User

        changeUserRole(changeUserRoleInput: ChangeUserRoleInput): User
        answerDriverLicense(answerDriverLicense: AnswerDriverLicense): User
        banUser(_id: ID!): User
        unBanUser(_id: ID!): User

        addCoordinates(updateCoordinatesInput: UpdateCoordinatesInput): User
    }    
`;