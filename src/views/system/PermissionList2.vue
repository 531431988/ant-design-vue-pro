<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="5">
        <s-tree :dataSource="orgTree" :openKeys.sync="openKeys" :search="true" @click="handleClick" @add="handleAdd" @titleClick="handleTitleClick"></s-tree>
      </a-col>
      <a-col :span="19">
        <a-table :data-source="tableData" :pagination="false" rowKey="id" defaultExpandAllRows>
          <a-table-column title="菜单名" data-index="title" width="30%" />
          <a-table-column title="页面权限" data-index="show" width="100px">
            <template #default="text, params">
              <a-switch v-model="params.show" v-if="params.children && params.children.length" checked-children="有权限" un-checked-children="无权限" @change="e => onSwitch(e, params)"></a-switch>
              <template v-else>
                <a-switch v-model="params.show" checked-children="有权限" un-checked-children="无权限" @change="e => onSwitch(e, params)"></a-switch>
              </template>
            </template>
          </a-table-column>
          <a-table-column title="功能权限" data-index="actions" align="right">
            <template #default="text, params">
              <a-select mode="tags" v-if="(params.actions && params.actions.length) && params.show" :defaultValue="params.actions" placeholder="请选择可操作的权限" style="width:100%" @change="val => onSelectChange(val, params)">
                <a-select-option v-for="item in actionsList" :key="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </template>
          </a-table-column>
        </a-table>
        <br />
        <a-row type="flex" justify="center">
          <a-col>
            <a-space>
              <a-button type="">取消</a-button>
              <a-button type="primary">保存</a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" />
  </a-card>
</template>

<script>
import STree from '@/components/Tree/Tree'
import { STable } from '@/components'
import OrgModal from './modules/OrgModal'
import { getOrgTree } from '@/api/manage'
import { mapGetters } from 'vuex'
// 演示数据-根据用户菜单初始化表格数据   实际开发中需要请求完整的菜单树
const initTableData = (data, actions) => {
  return data.map(item => {
    const current = {
      title: item.meta.title,
      id: item.name,
      show: true, // 是否可访问菜单
      actions // 页面操作相关的权限
    }
    if (item.children && item.children.length > 0) {
      current.children = initTableData(item.children, ['add'])
    }
    return current
  })
}
// 更新表格数据状态
const updateTableData = data => {
  data.map(item => {
    if (item.children && item.children.length > 0) {
      item.show = item.children.findIndex(node => node.show) !== -1
      updateTableData(item.children)
    }
  })
}
export default {
  name: 'TreeList',
  components: {
    STable,
    STree,
    OrgModal
  },
  data () {
    return {
      openKeys: ['key-01'],
      actionsList: [{ label: '新增', value: 'add' }, { label: '删除', value: 'del' }, { label: '编辑', value: 'edit' }, { label: '查询', value: 'query' }, { label: '导入', value: 'import' }, { label: '导出', value: 'export' }, { label: '下载', value: 'download' }],
      tableData: [
        /* {
          key: 1,
          name: '首页',
          show: false,
          children: [
            {
              key: 11,
              name: '监控页',
              show: false,
              actions: ['add', 'del']
            },
            {
              key: 12,
              name: '工作台',
              show: false,
              actions: ['download']
            }

          ]
        }, {
          key: 2,
          name: '表单页',
          show: true,
          children: [
            {
              key: 21,
              name: '基础表单',
              show: true,
              actions: ['add', 'del', 'edit', 'query', 'import', 'export', 'download']
            }
          ]
        } */
      ],
      orgTree: [],
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created () {
    getOrgTree().then(res => {
      this.orgTree = res.result
    })
    this.tableData = initTableData(this.addRouters[0].children)
  },
  computed: {
    ...mapGetters(['addRouters'])
  },
  methods: {
    handleClick (e) {
      console.log('handleClick', e)
      this.queryParam = {
        key: e.key
      }
      this.$refs.table.refresh(true)
    },
    handleAdd (item) {
      console.log('add button, item', item)
      this.$message.info(`提示：你点了 ${item.key} - ${item.title} `)
      this.$refs.modal.add(item.key)
    },
    handleTitleClick (item) {
      console.log('handleTitleClick', item)
    },
    titleClick (e) {
      console.log('titleClick', e)
    },
    handleSaveOk () {

    },
    handleSaveClose () {

    },
    onSwitch (val, params) {
      if (params.children && params.children.length) {
        params.children.forEach(item => item.show = val)
      } else {
        updateTableData(this.tableData)
      }
      params.show = val
    },
    onSelectChange (val, params) {
      params.actions = val
    }
  }
}
</script>

<style lang="less">
.custom-tree {
  /deep/ .ant-menu-item-group-title {
    position: relative;
    &:hover {
      .btn {
        display: block;
      }
    }
  }

  /deep/ .ant-menu-item {
    &:hover {
      .btn {
        display: block;
      }
    }
  }

  /deep/ .btn {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    width: 20px;
    height: 40px;
    line-height: 40px;
    z-index: 1050;

    &:hover {
      transform: scale(1.2);
      transition: 0.5s all;
    }
  }
}
</style>
