import { ICapsuleList } from "@/types/interfaces";
import CapsuleCard from "./CapsuleCard";

export default function CapsuleList({ capsules }: ICapsuleList) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capsules.map((capsule, index) => (
                <CapsuleCard
                    key={index}
                    title={capsule.title}
                    unlockDate={capsule.unlockDate}
                    username={capsule.username}
                />
            ))}
        </div>
    );
}