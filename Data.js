export const bookings = [
    {
      id: '#126',
      status: 'Accepted',
      name: 'Shallow Cleaning',
      date: '22 Nov 23, 12pm',
      price: '$20',
      company: 'Xavier & Co.',
      action: null,
      color:"rgba(1, 31, 75, 1)"
    },
    {
      id: '#126',
      status: 'Submitted',
      name: 'Shallow Cleaning',
      date: '22 Nov 23, 12pm',
      price: '$20',
      company: 'Xavier & Co.',
      action: 'Cancel Booking',
      color:"rgba(25, 129, 85, 1)"
    },
    {
      id: '#126',
      status: 'Ongoing',
      name: 'Shallow Cleaning',
      date: '22 Nov 23, 12pm',
      price: '$20',
      company: 'Xavier & Co.',
      action: null,
      color:"rgba(182, 164, 2, 1)"
    },
  ];
  export const slides = [
    {
      id: 1,
      title: 'Laundry Services',
      description: 'Get dependable and affordable services from organizations on this app',
      image: require('./assets/laundry.png')
    },
    {
      id: 2,
      title: 'House Cleaning',
      description: 'Get dependable and affordable services from organizations on this app',
      image: require('./assets/houseCleaning.png')
    },
    {
      id: 3,
      title: 'Car Wash Services',
      description: 'Get dependable and affordable services from organizations on this app',
      image: require('./assets/carWash.png')
    }
  ];

  export const singleOrganizationData =[
    {
      id:1,
      title:"Bathroom Cleaning",
      type:"Home service",
      amount: "Ghc50",
      image:require("./assets/org1.png"),
      desc: "Pacific Cleaners",
    },
    {
      id:2,
      title:"Moving(In and Out)",
      type:"Office service",
      amount: "Ghc50",
      image:require("./assets/org2.png"),
      desc: "Pacific Cleaners"
    },
    {
      id:3,
      title:"Deep Cleaning",
      type:"Office service",
      amount: "Ghc50",
      image:require("./assets/org3.png"),
      desc: "Pacific Cleaners"
    },
    {
      id:4,
      title:"Shallow Cleaning",
      type:"Office service",
      amount: "Ghc50",
      image:require("./assets/org4.png"),
      desc: "Pacific Cleaners"
    },
    {
      id:5,
      title:"Garage Cleaning",
      type:"Office service",
      amount: "Ghc50",
      image:require("./assets/org1.png"),
      desc: "Pacific Cleaners"
    },
    {
      id:6,
      title:"Office Cleaning",
      type:"Office service",
      amount: "Ghc50",
      image:require("./assets/org2.png"),
      desc: "Pacific Cleaners"
    },
    {
      id:7,
      title:"Kitchen Cleaning",
      type:"Office service",
      amount: "Ghc50",
      image:require("./assets/org3.png"),
      desc: "Pacific Cleaners"
    },
    {
      id:8,
      title:"Sofa and Carpet Cleaning",
      type:"Office service",
      amount: "Ghc50",
      image:require("./assets/org4.png"),
      desc: "Pacific Cleaners"
    },
    {
      id:9,
      title:"Sofa and Carpet Cleaning",
      type:"Office service",
      amount: "Ghc50",
      image:require("./assets/org4.png"),
      desc: "Pacific Cleaners"
    },
    {
      id:10,
      title:"Sofa and Carpet Cleaning",
      type:"Office service",
      amount: "Ghc50",
      image:require("./assets/org4.png"),
      desc: "Pacific Cleaners"
    }
  ]

 export const organizations = [
    {
      title: 'House Cleaning',
      horizontal: true,
      data: [
        {
          key: '1',
          text: 'Item text 1',
          image:require("./assets/org1.png")
        },
        {
          key: '2',
          text: 'Item text 2',
          image:require("./assets/org1.png")
        },
  
        {
          key: '3',
          text: 'Item text 3',
          image:require("./assets/org1.png"),
        },
        {
          key: '4',
          text: 'Item text 4',
          image:require("./assets/org1.png")
        },
        {
          key: '5',
          text: 'Item text 5',
          image:require("./assets/org1.png")
        },
      ],
    },
    {
      title: 'Laundry Services',
      horizontal: true,
      data: [
        {
          key: '1',
          text: 'Item text 1',
          image:require("./assets/org2.png"),
        },
        {
          key: '2',
          text: 'Item text 2',
          image:require("./assets/org2.png"),
        },
  
        {
          key: '3',
          text: 'Item text 3',
          image:require("./assets/org2.png"),
        },
        {
          key: '4',
          text: 'Item text 4',
          image:require("./assets/org2.png"),
        },
        {
          key: '5',
          text: 'Item text 5',
          image:require("./assets/org2.png"),
        },
      ],
    },
    {
      title: 'Car Washing Services',
      horizontal: true,
      data: [
        {
          key: '1',
          text: 'Item text 1',
          image:require("./assets/org4.png"),
        },
        {
          key: '2',
          text: 'Item text 2',
          image:require("./assets/org4.png"),
        },
  
        {
          key: '3',
          text: 'Item text 3',
          image:require("./assets/org4.png"),
        },
        {
          key: '4',
          text: 'Item text 4',
          image:require("./assets/org4.png"),
        },
        {
          key: '5',
          text: 'Item text 5',
          image:require("./assets/org4.png"),
        },
      ],
    },
  ];
  
  export const paymentMethods = [
    {
      id:1,
      name:"pay with Credit card",
      image:require("./assets/cash.png"),
    },
    {
      id:2,
      name:"pay with Paypal",
      image:require("./assets/cash.png"),
    },
    {
      id:3,
      name:"pay with MobileMoney",
      image:require("./assets/cash.png"),
    },
    {
      id:4,
      name:"pay on cash",
      image:require("./assets/cash.png"),
    },
  ]

  export const services = [
    {
        id:1,
        service:"Deep  Washing",
        date:"5/11/2023",
        amount: "Ghc100",
        update: "Update",
        delete: "Delete",
    },
    {
        id:2,
        service:"Deep  Washing",
        date:"5/11/2023",
        amount: "Ghc100",
        update: "Update",
        delete: "Delete",
    },
    {
        id:3,
        service:"Deep  Washing",
        date:"5/11/2023",
        amount: "Ghc100",
        update: "Update",
        delete: "Delete",
    },
    {
        id:4,
        service:"Deep  Washing",
        date:"5/11/2023",
        amount: "Ghc100",
        update: "Update",
        delete: "Delete",
    },
    {
        id:5,
        service:"Laundry Service",
        date:"5/11/2023",
        amount: "Ghc100",
        update: "Update",
        delete: "Delete",
    },
    {
        id:6,
        service:"Laundry Service",
        date:"5/11/2023",
        amount: "Ghc100",
        update: "Update",
        delete: "Delete",
    },
    {
        id:7,
        service:"Laundry Service",
        date:"5/11/2023",
        amount: "Ghc100",
        update: "Update",
        delete: "Delete",
    },
    {
        id:8,
        service:"Laundry Service",
        date:"5/11/2023",
        amount: "Ghc100",
        update: "Update",
        delete: "Delete",
    },
    {
        id:9,
        service:"Laundry Service",
        date:"5/11/2023",
        amount: "Ghc100",
        update: "Update",
        delete: "Delete",
    },
    {
        id:10,
        service:"Laundry Service",
        date:"5/11/2023",
        amount: "Ghc100",
        update: "Update",
        delete: "Delete",
    },
    {
      id:11,
      service:"Laundry Service",
      date:"5/11/2023",
      amount: "Ghc100",
      update: "Update",
      delete: "Delete",
  },
  {
    id:12,
    service:"Laundry Service",
    date:"5/11/2023",
    amount: "Ghc100",
    update: "Update",
    delete: "Delete",
},
{
  id:13,
  service:"Laundry Service",
  date:"5/11/2023",
  amount: "Ghc100",
  update: "Update",
  delete: "Delete",
},
{
  id:13,
  service:"Laundry Service",
  date:"5/11/2023",
  amount: "Ghc100",
  update: "Update",
  delete: "Delete",
},
{
  id:13,
  service:"Laundry Service",
  date:"5/11/2023",
  amount: "Ghc100",
  update: "Update",
  delete: "Delete",
},
{
  id:13,
  service:"Laundry Service",
  date:"5/11/2023",
  amount: "Ghc100",
  update: "Update",
  delete: "Delete",
},
{
  id:13,
  service:"Laundry Service",
  date:"5/11/2023",
  amount: "Ghc100",
  update: "Update",
  delete: "Delete",
},
{
  id:13,
  service:"Laundry Service",
  date:"5/11/2023",
  amount: "Ghc100",
  update: "Update",
  delete: "Delete",
},
{
  id:13,
  service:"Last Service",
  date:"5/11/2023",
  amount: "Ghc100",
  update: "Update",
  delete: "Delete",
},

]
