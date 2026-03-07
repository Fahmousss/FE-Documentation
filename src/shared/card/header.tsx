import useColor from '@/core/hooks/use-color';
import ButtonEID from '@/shared/button';
import { FILTER_DATE_TYPE } from '@/shared/date-picker/constant';
import { PRESETS_RANGE } from '@/shared/date-picker/presets-range';
import IconCalendar from '@/shared/icon/calendar';
import CircleMinus from '@/shared/icon/circle-minus';
import CirclePlus from '@/shared/icon/circle-plus';
import IconDownload from '@/shared/icon/download';
import FullSize from '@/shared/icon/full-size';
import Minimize from '@/shared/icon/minimize';
import { DatePicker, Popover, Select, Tooltip } from 'antd';
import IconFilter from '../icon/filter';
import { CardHeaderProps } from './types';

const colorTooltip = '#24262B';
const iconSize = 20;

const IconButton = ({
  title,
  icon,
  onClick,
}: {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) => {
  const { colorList } = useColor();
  return (
    <Tooltip color={colorTooltip} title={title}>
      <ButtonEID
        style={{
          borderWidth: 1,
          borderColor: colorList['text-secondary'],
        }}
        className="border border-secondary p-2"
        size="icon"
        variant="transparent"
        onClick={onClick}
      >
        {icon}
      </ButtonEID>
    </Tooltip>
  );
};

const CardHeader = ({
  zoomIn,
  zoomOut,
  export: exportOpt,
  fullScreen,
  filter,
  rangePicker,
  select,
  datePicker,
}: CardHeaderProps) => {
  const { colorList } = useColor();
  const filterRange = rangePicker?.allowedFilter
    ? FILTER_DATE_TYPE.filter((f) => rangePicker?.allowedFilter?.includes(f.value))
    : FILTER_DATE_TYPE;
  const filterDate = datePicker?.allowedFilter
    ? FILTER_DATE_TYPE.filter((f) => rangePicker?.allowedFilter?.includes(f.value))
    : FILTER_DATE_TYPE;
  return (
    <div className="flex items-center gap-1.5">
      {/* Zoom Out */}
      {zoomOut?.display && (
        <Tooltip color={colorTooltip} title={zoomOut.label ?? 'Zoom Out'}>
          <CircleMinus width={iconSize} height={iconSize} onClick={zoomOut.handler} />
        </Tooltip>
      )}

      {/* Zoom In */}
      {zoomIn?.display && (
        <Tooltip color={colorTooltip} title={zoomIn.label ?? 'Zoom In'}>
          <CirclePlus width={iconSize} height={iconSize} onClick={zoomIn.handler} />
        </Tooltip>
      )}

      {/* Full Screen */}
      {fullScreen?.display && (
        <Tooltip
          color={colorTooltip}
          title={fullScreen.label ?? (fullScreen.label || 'Full Screen')}
        >
          {fullScreen?.label === 'exit' ? (
            <Minimize width={iconSize} height={iconSize} onClick={fullScreen.handler} />
          ) : (
            <FullSize width={iconSize} height={iconSize} onClick={fullScreen.handler} />
          )}
        </Tooltip>
      )}

      {/* Select */}
      {select?.display && (
        <Select
          className="w-32"
          value={select.value}
          options={select.options}
          onChange={select.handler}
          optionFilterProp="label"
          allowClear
        />
      )}

      {/* Filter Button */}
      {filter?.display && (
        <IconButton
          title={filter.label ?? 'Filter Data'}
          onClick={filter.handler}
          icon={<IconFilter width={iconSize} height={iconSize} />}
        />
      )}

      {/* Range Picker */}
      {rangePicker?.display && (
        <Tooltip color={colorTooltip} title={rangePicker.label ?? 'Filter Range Picker'}>
          <Popover
            trigger={['click']}
            placement="bottom"
            content={
              <div className="flex gap-3 items-center">
                {rangePicker.withType && (
                  <Select
                    allowClear
                    showSearch
                    optionFilterProp="label"
                    size="large"
                    value={rangePicker.type}
                    onChange={(value) => rangePicker.setType?.(value)}
                    className="w-32"
                    options={filterRange}
                  />
                )}

                <DatePicker.RangePicker
                  size="large"
                  allowEmpty
                  format={rangePicker.formatDate ?? 'DD-MMM-YYYY'}
                  disabled={rangePicker.type === 'default'}
                  presets={
                    rangePicker.withPresets && rangePicker.type === 'day' ? PRESETS_RANGE : []
                  }
                  picker={
                    rangePicker.withType
                      ? rangePicker.type === 'day'
                        ? 'date'
                        : (rangePicker.type as any)
                      : rangePicker.dateType
                  }
                  onChange={rangePicker.handler}
                  onCalendarChange={rangePicker.handler}
                />
              </div>
            }
          >
            <ButtonEID
              style={{
                borderWidth: 1,
                borderColor: colorList['text-secondary'],
              }}
              className="p-2"
              size="icon"
              variant="transparent"
            >
              <IconCalendar width={iconSize} height={iconSize} />
            </ButtonEID>
          </Popover>
        </Tooltip>
      )}
      {/* Date Picker */}
      {datePicker?.display && (
        <Tooltip color={colorTooltip} title={datePicker.label ?? 'Filter Date Picker'}>
          <Popover
            trigger={['click']}
            placement="bottom"
            content={
              <div className="flex gap-3 items-center">
                {datePicker.withType && (
                  <Select
                    allowClear
                    showSearch
                    optionFilterProp="label"
                    size="large"
                    value={datePicker.type}
                    onChange={(value) => datePicker.setType?.(value)}
                    className="w-32"
                    options={filterDate}
                  />
                )}

                <DatePicker
                  size="large"
                  format={datePicker.formatDate ?? 'DD-MMM-YYYY'}
                  disabled={datePicker.type === 'default'}
                  picker={
                    datePicker.withType
                      ? datePicker.type === 'day'
                        ? 'date'
                        : (datePicker.type as any)
                      : datePicker.dateType
                  }
                  onChange={datePicker.handler}
                  onCalendarChange={datePicker.handler}
                />
              </div>
            }
          >
            <ButtonEID
              style={{
                borderWidth: 1,
                borderColor: colorList['text-secondary'],
              }}
              className="p-2"
              size="icon"
              variant="transparent"
            >
              <IconCalendar width={iconSize} height={iconSize} />
            </ButtonEID>
          </Popover>
        </Tooltip>
      )}

      {/* Export */}
      {exportOpt?.display && (
        <IconButton
          title={exportOpt.label ?? 'Export Data'}
          onClick={exportOpt.handler}
          icon={
            <IconDownload width={iconSize} height={iconSize} color={colorList['text-secondary']} />
          }
        />
      )}
    </div>
  );
};

export default CardHeader;
