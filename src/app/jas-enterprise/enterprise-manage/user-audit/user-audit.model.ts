export const userAuditConfig={
    "tabs": [
        {
          name: "待审核",
        },
        {
          name: '已审核',
        },
      ],
      "toBeAuditedList":[
        { field: "name", text: "申请人", },
        { field: "mobileNum", text: "手机号", },
        { field: "email", text: "邮箱", },
        { field: "createTime", text: "申请时间", },
      ],
      "auditedList":[
        { field: "name", text: "申请人", },
        { field: "mobileNum", text: "手机号", },
        { field: "email", text: "邮箱", },
        { field: "createTime", text: "申请时间", },
        { field: "createUser", text: "审核人", },
        { field: "modifyTime", text: "审核时间", },
        { field: "modifyResult", text: "审核结果", },
        { field: "modifyPro", text: "审核意见", }
      ],
      options:[
        { value: 'pass', label: '通过' },
        { value: 'reject', label: '驳回' },
      ],
      "nodes": [
        {
          id: 1,
          name: 'root1',
          isExpanded: true,     // 是否展开子节点， true： 展开子节点
          children: [
            { id: 2, name: 'child1', children: [], isExpanded: true, },
            { id: 3, name: 'child2', children: [], isExpanded: true, },
            {
              id: 4,
              name: 'root2',
              isExpanded: true,
              children: [
                { id: 5, name: 'child2.1', children: [], isExpanded: true, },
                {
                  id: 6,
                  name: 'card',
                  isExpanded: true,
                  children: [
                    { id: 7, name: 'TV', children: [], isExpanded: true, }
                  ]
                }
              ]
            }
          ]
        },
      ]
}