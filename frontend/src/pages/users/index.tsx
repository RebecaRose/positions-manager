import { useStores } from "../../stores/root-store";

const Users = () => {
    const { usersStore } = useStores();

    return (
        <div>
            users page
        </div>
    );
};

export default Users;
