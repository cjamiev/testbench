import { HTTP_STATUS } from 'constants/httpstatus';

export const getNewMockFields = () => {
  return [
    {
      id: 1,
      type: 'text',
      label: 'Optional File Name',
      selected: '',
      orderSeq: 1
    },
    {
      id: 2,
      type: 'text',
      label: 'Url',
      selected: '/test',
      orderSeq: 2
    },
    {
      id: 3,
      type: 'select',
      label: 'Method',
      values: [
        {
          label: 'GET',
          selected: true
        },
        {
          label: 'POST',
          selected: false
        }
      ],
      orderSeq: 3
    },
    {
      id: 4,
      type: 'textarea',
      label: 'Headers',
      selected: JSON.stringify({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      jsonType: true,
      errorMessage: 'Please enter valid json',
      orderSeq: 4
    },
    {
      id: 5,
      type: 'select',
      label: 'Status Code',
      values: Object.keys(HTTP_STATUS).map(item => {
        return {
          label: String(HTTP_STATUS[item]),
          selected: Boolean(HTTP_STATUS.OK === HTTP_STATUS[item])
        };
      }),
      orderSeq: 5
    },
    {
      id: 6,
      type: 'textarea',
      label: 'Body',
      selected: JSON.stringify({
        'test': 'testing get'
      }),
      jsonType: true,
      errorMessage: 'Please enter valid json',
      orderSeq: 6
    },
    {
      id: 7,
      type: 'textarea',
      label: 'Conditional Response',
      selected: JSON.stringify([
        {
          'payload': {
            'key': 'condition'
          },
          'body': {
            'test': 'testing conditional post'
          }
        }
      ]),
      jsonType: true,
      errorMessage: 'Please enter valid json',
      orderSeq: 7
    }
  ];
};

export const mapFieldsToNewMockPayload = (fields) => {
  return {
    filename: fields.find(item => item.id === 1).selected,
    content: {
      request: {
        url: fields.find(item => item.id === 2).selected,
        method: fields.find(item => item.id === 3).values.find(item => item.selected).label
      },
      response: {
        headers: JSON.parse(fields.find(item => item.id === 4).selected),
        status: Number(fields.find(item => item.id === 5).values.find(item => item.selected).label),
        body: JSON.parse(fields.find(item => item.id === 6).selected),
        conditionalResponse: JSON.parse(fields.find(item => item.id === 7).selected)
      }
    }
  };
};

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
      values: Object.keys(HTTP_STATUS).map(item => {
        return {
          label: String(HTTP_STATUS[item]),
          selected: Boolean(config.overrideStatusCode === HTTP_STATUS[item])
        };
      }),
      orderSeq: 6
    },
    {
      id: 7,
      type: 'textarea',
      label: 'Response',
      selected: JSON.stringify(config.overrideResponse),
      jsonType: true,
      errorMessage: 'Please enter valid json',
      orderSeq: 7
    }
  ];
};

export const mapFieldsToConfigPayload = (fields) => {
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