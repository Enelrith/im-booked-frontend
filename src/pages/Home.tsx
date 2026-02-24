import { getUser } from '../services/GetUser';

export default function Home() {
  const handleClick = async () => {
    const response = await getUser('f7ea590f-3802-4d79-947a-b195962cb16e');
    if (!response) return;

    console.log(response);
  };

  return (
    <button className="button-theme" onClick={() => handleClick()}>
      Get User
    </button>
  );
}
