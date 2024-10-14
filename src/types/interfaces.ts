export interface ICapsule {
    title: string;
    unlockDate: Date | null;
    username: string;
}

export interface ICapsuleList {
    capsules: ICapsule[];
}