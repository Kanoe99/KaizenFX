import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="bg-green-500">
      hello world
      <Link to="/test">test page</Link>
    </div>
  );
};

export { Menu };