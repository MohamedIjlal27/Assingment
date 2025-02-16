import type { TreeNode } from "@/types"

export const initialTree: TreeNode[] = [
  {
    id: "1",
    label: "system management",
    children: [
      {
        id: "2",
        label: "System Management",
        children: [
          {
            id: "3",
            label: "Systems",
            children: [],
          },
          {
            id: "4",
            label: "System Code",
            children: [
              {
                id: "5",
                label: "Code Registration",
                children: [],
              },
            ],
          },
          {
            id: "6",
            label: "Code Registration - 2",
            children: [],
          },
          {
            id: "7",
            label: "Properties",
            children: [],
          },
          {
            id: "8",
            label: "Menus",
            children: [
              {
                id: "9",
                label: "Menu Registration",
                children: [],
              },
            ],
          },
          {
            id: "10",
            label: "API List",
            children: [
              {
                id: "11",
                label: "API Registration",
                children: [],
              },
              {
                id: "12",
                label: "API Edit",
                children: [],
              },
            ],
          },
          {
            id: "13",
            label: "Users & Groups",
            children: [
              {
                id: "14",
                label: "Users",
                children: [
                  {
                    id: "15",
                    label: "User Account Registration",
                    children: [],
                  },
                ],
              },
              {
                id: "16",
                label: "Groups",
                children: [
                  {
                    id: "17",
                    label: "User Group Registration",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: "18",
            label: "사용자 승인",
            children: [
              {
                id: "19",
                label: "사용자 승인 상세",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
]

