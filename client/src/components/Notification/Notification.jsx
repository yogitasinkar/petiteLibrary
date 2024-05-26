import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';

const NotificationTypes = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  PRIMARY: 'primary',
};

const Notification = ({
   text, supportingText,  
}) => {

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col text-sm">
        <div className="text-gray-700">{text}</div>
        <div className="flex text-gray-500">{supportingText}</div>
      </div>
    </div>
  );
};

Notification.propTypes = {
  thisToast: PropTypes.shape({ id: PropTypes.string }),
  type: PropTypes.oneOf(Object.values(NotificationTypes)),
  text: PropTypes.string,
  supportingText: PropTypes.string,
};

Notification.defaultProps = {
  thisToast: {},
  type: NotificationTypes.SUCCESS,
  text: '',
  supportingText: '',
};

const commonToastProperties = {
  duration: 4000,
  position: 'top-right',
};

const notification = {
  success: (text, supportingText) => toast((t) => (
    <Notification
      thisToast={t}
      text={text}
      supportingText={supportingText}
      type={NotificationTypes.SUCCESS}
    />
  ), {
    ...commonToastProperties,
  }),
  error: (text, supportingText) => toast((t) => (
    <Notification
      thisToast={t}
      text={text}
      supportingText={supportingText}
      type={NotificationTypes.ERROR}
    />
  ), {
    ...commonToastProperties,
  }),
  warning: (text, supportingText) => toast((t) => (
    <Notification
      thisToast={t}
      text={text}
      supportingText={supportingText}
      type={NotificationTypes.WARNING}
    />
  ), {
    ...commonToastProperties,
  }),
};

export default notification;
