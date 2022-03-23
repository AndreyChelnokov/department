<template>
  <div
      @dragstart="start"
      @dragend="end"
      class="department"
      :id="name"
      :class="`level_${level} ${noPointerClass ? 'department_no-pointer' : ''}` "
      draggable="true">
    <div
        class="department__title"
        :class="{'department__title-parent': children.length, 'department__title-hovered': hovered}"
        @dragover.prevent
        @drop.prevent="drop"
        @dragenter="enter"
        @dragleave="leave"
    >{{ name }}</div>

    <div class="department__children" >
      <div
          v-if="children.length >= 2"
          class="department__children-line"
          :style="{
            left: widthLineWrap.left + 'px',
            right: widthLineWrap.right + 'px',
            width: 'auto',
          }"
      >
      </div>

      <app-department
          v-for="department in children"
          ref="department_children"
          :key="department.name"
          :name="department.name"
          :children="department.children"
          :level="level + 1"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-department',
  data: function () {
    return {
      noPointerClass: false,
      hovered: false,
      widthLineWrap: {
        left: 0,
        right: 0,
        width: 100,
      }
    }
  },
  props: {
    level: {
      type: Number
    },
    name: {
      type: String,
      required: true,
    },
    children: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getDataFoTopLine: function () {
      if (this.children.length >= 2) {
        const listChildrenDepartments = this.$refs.department_children;

        const firstItem = listChildrenDepartments[0].$el
        const lastItem = listChildrenDepartments[listChildrenDepartments.length - 1].$el

        const widthFirstItem = firstItem.clientWidth;
        const widthLastItem = lastItem.clientWidth;

        this.widthLineWrap.left = widthFirstItem / 2;
        this.widthLineWrap.right = widthLastItem / 2;
      }
    },

    start: function (e) {
      e.stopPropagation();

      setTimeout(() => {
        this.noPointerClass = true;
      }, 0)

      this.$store.commit('SET_CURRENT_ITEMS', this.name)
    },
    end: function () {
      this.noPointerClass = false;
    },
    enter: function () {
      this.hovered = true;
    },
    leave: function () {
      this.hovered = false;
    },
    drop: function (e) {
      e.stopPropagation();

      const currentNode = this.$store.state.listCurrentItems[this.$store.state.listCurrentItems.length - 1];
      const newParentNode = this.name

      if (currentNode !== newParentNode) {
        this.$store.commit('SET_MOVING_DATA', { currentNode, newParentNode })
      }
    }
  },
  mounted() {
    this.getDataFoTopLine();
  }
}
</script>


<style lang="scss" scoped>
.department {
  padding: 0 10px;
  width: fit-content;
  margin: 0 auto;

  &_no-pointer {
    pointer-events: none;
  }

  &__title {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 130px;
    height: 42px;
    background: lightblue;
    margin: 0 auto;

    &-hovered {
      background: #528495;
    }

    &-parent {
      margin-bottom: 50px;
      position: relative;

      &:after {
        content: '';
        width: 1px;
        height: 25px;
        background: black;
        position: absolute;
        left: 50%;
        top: 100%;
      }
    }
  }
  &__children {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    position: relative;

    &-line {
      height: 1px;
      width: 100%;
      background: #000000;

      position: absolute;
      left: 0;
      top: -26px;
    }

    &-parent {
      &:after {
        content: '';
        width: calc(100% - 20px - 130px);
        height: 1px;
        background: black;
        position: absolute;
        left: calc(150px / 2);
        top: -25px;
      }
    }

    & .department__title {
      position: relative;
      &:before {
        content: '';
        width: 1px;
        height: 25px;
        background: black;
        position: absolute;
        left: 50%;
        bottom: 100%;
      }
    }
  }
}
</style>
