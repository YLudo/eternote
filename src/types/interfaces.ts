export interface IPartialCapsule {
    id: string;
    title: string;
    unlockDate: Date | null;
    username: string;
}

export interface IPartialCapsuleList {
    capsules: IPartialCapsule[];
}

export interface ICapsule {
    title: string;
    content: string | null;
    unlockDate: Date | null;
}