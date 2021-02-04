import { useStores } from "../../stores/root-store";

const Positions = () => {
    const { positionsStore } = useStores();
    return (
        <div>
            positions page
        </div>
    );
};

export default Positions;
