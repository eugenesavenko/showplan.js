<template>
    <div class="content">
        <h4>Filter Predicate</h4>
        <sql-string
            :sql="filter.Predicate.ScalarOperator.ScalarString"
            :expanded-columns="expandedChildColumns"
        />
    </div>
</template>

<script lang='ts'>
import {
    Vue, Component, Prop,
} from 'vue-property-decorator';
import { RelOp, Filter, ExpandedComputedColumn } from 'showplan-js';
import SqlString from './SqlString.vue';

@Component({
    components: { SqlString },
})
export default class FilterView extends Vue {
  @Prop() public operation!: RelOp;

  private get filter(): Filter {
      return this.operation.Action as Filter;
  }

  private get expandedChildColumns(): ExpandedComputedColumn[] {
      return this.operation.GetChildExpandedComputedColumns();
  }
}
</script>
