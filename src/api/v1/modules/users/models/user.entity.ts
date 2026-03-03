

/**
 * Pure domain model — DB agnostic
 */
export interface IUserEntity {
    id: string;
    fullName: string;
    avatar: string | null;
    bio: string;
    followers: string[];
    following: string[];
    createdAt: Date;
    updatedAt: Date;
}

