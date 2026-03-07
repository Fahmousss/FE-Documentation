import { INotification } from './model';

export const FAKE_NOTIFICATIONS: INotification[] = [
  {
    id: '1',
    title: 'New Project Assigned',
    description: 'You have been assigned to the Electrindo IoT project.',
    is_read: false,
    created_at: '2025-05-01T10:30:00.000Z',
  },
  {
    id: '2',
    title: 'System Update',
    description: 'The system will undergo maintenance on May 10.',
    is_read: true,
    created_at: '2025-04-30T08:00:00.000Z',
  },
  {
    id: '3',
    title: 'Deadline Reminder',
    description: 'Project "Monitoring App" is due tomorrow.',
    is_read: false,
    created_at: '2025-05-06T14:45:00.000Z',
  },
  {
    id: '4',
    title: 'Feedback Request',
    description: 'Please review the recent deployment report.',
    is_read: true,
    created_at: '2025-04-28T12:15:00.000Z',
  },
  {
    id: '5',
    title: 'Weekly Summary',
    description: 'Your weekly progress report is ready to view.',
    is_read: false,
    created_at: '2025-05-05T09:00:00.000Z',
  },
];
