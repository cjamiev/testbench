import React from 'react';
import Page from 'components/layout';
import Dropdown from 'components/form/Dropdown';
import List from 'components/list';
import Radio from 'components/form/Radio';
import Checkbox from 'components/form/Checkbox';
import Button from 'components/button';
import { noop } from 'helper/noop';

const testData = [
  [
    {
      'type': 'link',
      'label': 'cjamiev/playground ',
      'value': 'https://github.com/cjamiev/playground'
    },
    {
      'type': 'text',
      'value': 'testing123'
    }
  ],
  [
    {
      'type': 'copy',
      'label': 'username',
      'value': 'cjamiev1836'
    }
  ],
  [
    {
      'type': 'timer',
      'label': '35rd Birthday',
      'value': 'March 18, 2023'
    }
  ]
];

const StyleGuide = () => {

  return (
    <Page>
      <div>
        <h2> Buttons </h2>
        <Button label="Default Button" onClick={noop} />
        <Button label="Primary Button" classColor='primary' onClick={noop} />
        <Button label="Secondary Button" classColor='secondary' classSize='wide' onClick={noop} />
      </div>

      <Checkbox label='Checkbox' values={[{ label: 'Checkbox1', selected: true }, { label: 'Checkbox2', selected: false }]} onChange={noop} />
      <Radio label='Radio' values={[{ label: 'Radio1', selected: true }, { label: 'Radio2', selected: false }]} onChange={noop} />

      <div>
        <h2> Links </h2>
        <a className="link" href="https://www.facebook.com/" target="_blank">Facebook</a>
      </div>

      <div>
        <h2> List </h2>
        <List header='test header' data={testData} />
      </div>

      <div>
        <h2> Dynamically shown content </h2>
        <div className="tooltip">Hover over me
          <span className="tooltip__text tooltip__text--top">Tooltip text</span>
        </div>

        <br/>
        <Dropdown label='Dropdown' values={[{ label:'item1', selected: false}, { label:'item2', selected: false}]} />
      </div>
    </Page>
  );
};

export default StyleGuide;
