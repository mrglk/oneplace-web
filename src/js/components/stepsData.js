import { getCurrentLang, langs } from './translation';

const lang = getCurrentLang();

export const steps = [
  {
    title: langs[lang].sumTitle,
    name: 'sum',
    options: {
      type: 'radio',
      items: [
        {
          id: 'dsd8d',
          value: langs[lang].sumFirst,
          name: 'sum',
          checked: true,
        },
        {
          id: 'duf8g',
          value: langs[lang].sumSecond,
          name: 'sum',
          checked: false,
        },
        {
          id: 'vv9d9',
          value: langs[lang].sumThird,
          name: 'sum',
          checked: false,
        },
        {
          id: 'vv9d0',
          value: langs[lang].sumFourth,
          name: 'sum',
          checked: false,
        },
      ],
    },
  },
  {
    title: langs[lang].typeTitle,
    name: 'type',
    options: {
      type: 'radio',
      items: [
        {
          id: '2sd8d',
          value: langs[lang].typeFirst,
          name: 'type',
          checked: true,
        },
        {
          id: '2uf8g',
          value: langs[lang].typeSecond,
          name: 'type',
          checked: false,
        },
      ],
    },
  },
  {
    title: langs[lang].sizeTitle,
    name: 'size',
    options: {
      type: 'checkbox',
      items: [
        {
          id: '2sd8d',
          value: langs[lang].sizeFirst,
          checked: true,
        },
        {
          id: '2ufwg',
          value: langs[lang].sizeSecond,
          checked: false,
        },
        {
          id: '25d8d',
          value: langs[lang].sizeThird,
          checked: false,
        },
        {
          id: '3we8g',
          value: langs[lang].sizeFourth,
          checked: false,
        }
      ],
    },
  },
    {
    title: langs[lang].bedroomsTitle,
    name: 'bedrooms',
    options: {
      type: 'radio',
      items: [
        {
          id: '2s88d4',
          value: langs[lang].bedroomsFirst,
          checked: true,
        },
        {
          id: '2u9wg0',
          value: langs[lang].bedroomsSecond,
          checked: false,
        },
        {
          id: '2508dt5',
          value: langs[lang].bedroomsThird,
          checked: false,
        },
        {
          id: '36e8g15',
          value: langs[lang].bedroomsFourth,
          checked: false,
        }
      ],
    },
  },
  // {
  //   title: langs[lang].comfortTitle,
  //   options: {
  //     type: 'checkbox',
  //     items: [
  //       {
  //         id: '2s88d',
  //         value: langs[lang].comfortFirst,
  //         checked: true,
  //       },
  //       {
  //         id: '2u9wg',
  //         value: langs[lang].comfortSecond,
  //         checked: false,
  //       },
  //       {
  //         id: '2508d',
  //         value: langs[lang].comfortThird,
  //         checked: false,
  //       },
  //       {
  //         id: '36e8g',
  //         value: langs[lang].comfortFourth,
  //         checked: false,
  //       },
  //       {
  //         id: '1qe8g',
  //         value: langs[lang].comfortFifth,
  //         checked: false,
  //       },
  //     ],
  //   },
  // },
  {
    title: langs[lang].locationTitle,
    name: 'location',
    options: {
      type: 'checkbox',
      items: [
        {
          id: '2s84354',
          value: 'Dubai Downtown & Business Bay',
          checked: false,
        },
        {
          id: '2u9w657',
          value: 'Palm Jumeirah',
          checked: false,
        },
        {
          id: '250feg',
          value: 'City Walk',
          checked: true,
        },
        {
          id: '3mhbf',
          value: 'Damac Hills',
          checked: false,
        },
        {
          id: '1qopo',
          value: 'Dubai Creek Harbour',
          checked: false,
        },
        {
          id: '23lfm',
          value: 'Dubai Marina',
          checked: false,
        },
        {
          id: 'lkj7',
          value: 'Mohammed Bin Rashid City ',
          checked: false,
        },
        {
          id: 'sqnc893',
          value: 'Emaar Beachfront',
          checked: false,
        },
        {
          id: 'sqnc111',
          value: 'JLT',
          checked: false,
        },
        {
          id: 'sq3sdd3',
          value: langs[lang].no_know,
          checked: false,
        },
      ],
    },
  },
  {
    title: langs[lang].stageTitle,
    name: 'experience',
    options: {
      type: 'radio',
      items: [
        {
          id: '2sd09wed',
          value: langs[lang].stageFirst,
          name: 'stage',
          checked: true,
        },
        {
          id: '2ufvx8g',
          value: langs[lang].stageTitle2,
          name: 'stage',
          checked: false,
        },
      ],
    },
  },
  {
    title: langs[lang].experienceTitle,
    name: 'stage',
    options: {
      type: 'radio',
      items: [
        {
          id: '89sd8d',
          value: langs[lang].experienceFirst,
          name: 'experience',
          checked: true,
        },
        {
          id: '2ods8g',
          value: langs[lang].experienceSecond,
          name: 'experience',
          checked: false,
        },
      ],
    },
  },
  // {
  //   title: langs[lang].cashTitle,
  //   options: {
  //     type: 'radio',
  //     items: [
  //       {
  //         id: '2sd00d',
  //         value: langs[lang].cashFirst,
  //         name: 'cash',
  //         checked: true,
  //       },
  //       {
  //         id: '2u45gg',
  //         value: langs[lang].cashTitle2,
  //         name: 'cash',
  //         checked: false,
  //       },
  //     ],
  //   },
  // },
];