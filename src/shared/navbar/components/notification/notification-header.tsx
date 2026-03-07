import { Link } from 'react-router-dom';

const NotificationHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <h5 className="text-base text-grey-500">Notification</h5>
        <p className="text-sm text-grey-200">Stay updated with your latest notification</p>
      </div>
      <Link to={'/notification'}>
        <p className="text-md text-blue-500">View all</p>
      </Link>
    </div>
  );
};

export default NotificationHeader;
