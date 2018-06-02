<template>
<div class="affiliation-dropdown">
  <dropdown :items="items" :value="value" @selected="emitSelection">
    <template slot="selection" slot-scope="selection">
      <span class="selection-wrap">
        {{selection.text}} <chevron-down-icon/>
      </span>
    </template>
    <template slot="option" slot-scope="option">
      {{option.value}} <check-circle-icon v-if="option.isCurrent" class="checkmark"/> <lock-icon v-if="isLocked(option.id)"/>
    </template>
  </dropdown>
</div>
</template>

<script>
import Dropdown from '@/components/Dropdown'
import { ChevronDownIcon, CheckCircleIcon, LockIcon } from 'vue-feather-icons'

export default {
  name: 'affiliation-dropdown',
  props: ['items', 'value'],
  components: {
    Dropdown,
    ChevronDownIcon,
    CheckCircleIcon,
    LockIcon
  },
  methods: {
    emitSelection (selected) {
      this.$emit('selected', selected)
    },
    isLocked (optionId) {
      return optionId === 'organizationMember'
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/_globals.scss";

.affiliation-dropdown {
  cursor: pointer;
  position: relative;
  font-size: 14px;

  .selection {
    color: $black;
    font-weight: 600;
    background: transparent;
    border: 1px solid #f2f2f2;
    border-radius: 3px;
    padding: 8px;
    display: inline-block;
    .selection-wrap {
      display: flex;
      align-items: center;
    }
    &:hover {
      color: $black;
    }
    .feather {
      color: $dark-blue;
      margin-left: 5px;
      height: 16px;
    }
  }
  .options {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, .15);
    border-radius: 0 0 3px 3px;
    box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.4);
    overflow: auto;
    width: auto;
    position: absolute;
    z-index: 100;
    right: 0;

    .option {
      padding: 15px 18px;
      transition: background 0.3s;
      display: flex;
      align-items: center;

      &:hover {
        background: #EFFCFE;
      }
      .feather {
        height: 16px;
        color: #E5B753; 
      }
      .checkmark {
        color: $check-green;
        margin-left: 5px;
      }
    }
  }
}
</style>
