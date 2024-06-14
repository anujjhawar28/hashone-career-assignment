const hierarchyData = [
  {
    id: 1,
    label: "Parent",
    children: [
      {
        id: 2,
        label: "Child",
        children: [
          {
            id: 3,
            label: "Sub-Child",
          },
          {
            id: 4,
            label: "Sub-Child",
          },
        ],
      },
      {
        id: 5,
        label: "Child",
      },
    ],
  },
  {
    id: 6,
    label: "Parent",
    children: [
      {
        id: 7,
        label: "Child",
      },
    ],
  },
  {
    id: 8,
    label: "Parent",
  },
  {
    id: 9,
    label: "Parent",
    children: [
      {
        id: 11,
        label: "Child",
      },
      {
        id: 12,
        label: "Child",
        children: [
          {
            id: 13,
            label: "Sub-Child",
          },
          {
            id: 14,
            label: "Sub-Child",
            children: [
              {
                id: 15,
                label: "Sub-Child",
              },
              {
                id: 16,
                label: "Sub-Child",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 10,
    label: "Parent",
  },
];

export default hierarchyData;
