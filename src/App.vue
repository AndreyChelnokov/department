<template>
  <div :key="keyCode" id="app">
    <app-department @updateData="updateData(organization, $event.start, $event.end)" v-for="department in organization" :key="department.name" :name="department.name" :children="department.children" :level="1" />
  </div>
</template>

<script>
import appDepartment from './components/app-department.vue';
import {getLinkNodeInArray} from "./utils";

export default {
  name: 'App',
  data: function () {
    return {
      keyCode: 1,
      organization: [
        {
          name: 'Руководство',
          children: [
            {
              name: 'Отдел 1',
              children: [
                {
                  name: 'Отдел 2',
                  children: []
                },
                {
                  name: 'Отдел 3',
                  children: []
                },
                {
                  name: 'Отдел 4',
                  children: []
                }
              ]
            },
            {
              name: 'Отдел 5',
              children: [
                {
                  name: 'Отдел 6',
                  children: []
                }
              ]
            },
            {
              name: 'Отдел 7',
              children: []
            }
          ]
        }
      ]
    }
  },
  methods: {
    updateData: function (array, currentName, newParentName) {
      const currentNode = getLinkNodeInArray(this.organization, currentName);
      const parentNode = getLinkNodeInArray(this.organization, newParentName);

      this.addNode(parentNode.array[parentNode.index], this.copyNode(currentNode.array[currentNode.index]))
      this.removeNode(currentNode.array, currentNode.index)

      this.keyCode++
    },
    copyNode: function (node) {
      return JSON.parse(JSON.stringify(node))
    },
    addNode: function (parent, current) {
      parent.children.push(current);
    },
    removeNode: function (array, index) {
      array.splice(index, 1)
    }
  },
  computed: {
    eventList: function () {
      return this.$store.state.movingData;
    },
    lastEvent: function () {
      const arr = this.eventList;
      return arr[arr.length - 1];
    },
  },
  components: {
    'app-department': appDepartment,
  },
  watch: {
    eventList: function () {
      this.updateData(this.organization, this.lastEvent.currentNode, this.lastEvent.newParentNode)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
