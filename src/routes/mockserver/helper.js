import { HTTP_STATUS } from 'constants/httpstatus';

export const mapConfigPayloadToFields = (config) => {
  return [
    {
      id: 1,
      type: 'radio',
      label: 'Run Log?',
      values: [
        {
          label: 'Yes',
          selected: config.log
        },
        {
          label: 'No',
          selected: !config.log
        }
      ],
      orderSeq: 1
    },
    {
      id: 2,
      type: 'radio',
      label: 'Error All Endpoints?',
      values: [
        {
          label: 'Yes',
          selected: config.error
        },
        {
          label: 'No',
          selected: !config.error
        }
      ],
      orderSeq: 2
    },
    {
      id: 3,
      type: 'text',
      label: 'Delay (ms)',
      regex: '[0-9]+',
      selected: config.delay,
      errorMessage: 'Please enter a valid number',
      orderSeq: 3
    },
    {
      id: 4,
      type: 'text',
      label: 'Comma separated Urls, blank = all',
      selected: config.delayUrls.join(','),
      orderSeq: 4
    },
    {
      id: 5,
      type: 'text',
      label: 'Override, enter comma separated Urls',
      selected: config.overrideUrls.join(','),
      orderSeq: 5
    },
    {
      id: 6,
      type: 'select',
      label: 'Status Code',
      values: [
        {
          label: '200',
          selected: Boolean(config.overrideStatusCode === HTTP_STATUS.OK)
        },
        {
          label: '400',
          selected: Boolean(config.overrideStatusCode === HTTP_STATUS.BAD_REQUEST)
        },
        {
          label: '401',
          selected: Boolean(config.overrideStatusCode === HTTP_STATUS.UNAUTHORIZED)
        },
        {
          label: '403',
          selected: Boolean(config.overrideStatusCode === HTTP_STATUS.FORBIDDEN)
        },
        {
          label: '404',
          selected: Boolean(config.overrideStatusCode === HTTP_STATUS.NOT_FOUND)
        },
        {
          label: '500',
          selected: Boolean(config.overrideStatusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR)
        }
      ],
      orderSeq: 6
    },
    {
      id: 7,
      type: 'text',
      label: 'Response',
      selected: JSON.stringify(config.overrideResponse),
      orderSeq: 7
    }
  ];
};

const mapFieldsToPayload = (fields) => {
  return {
    delay: Number(fields.find(item => item.id === 3).selected),
    delayUrls: fields.find(item => item.id === 4).selected.split(','),
    log: fields.find(item => item.id === 1).values.find(item => item.label === 'Yes').selected,
    error: fields.find(item => item.id === 2).values.find(item => item.label === 'Yes').selected,
    overrideUrls: fields.find(item => item.id === 5).selected.split(','),
    overrideStatusCode: Number(fields.find(item => item.id === 6).values.find(item => item.selected).label),
    overrideResponse: JSON.parse(fields.find(item => item.id === 7).selected)
  };
};