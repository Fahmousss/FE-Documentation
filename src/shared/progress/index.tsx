import { Progress } from 'antd';

interface ProgresEIDProps {
  value: number;
}

const ProgresEID = ({ value }: ProgresEIDProps) => {
  return <Progress percent={value} status="active" />;
};

export default ProgresEID;
