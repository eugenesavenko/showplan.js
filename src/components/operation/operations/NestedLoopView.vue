<template>
    <div v-if="nestedLoop.Predicate !== undefined && nestedLoop.PassThru !== undefined && nestedLoop.OuterReferences !== undefined">
        <div
            v-if="nestedLoop.Predicate !== undefined"
            class="content"
        >
            <h4>Predicate</h4>
            <div>
                <sql-string
                    :sql="nestedLoop.Predicate.ScalarOperator.ScalarString"
                    :expanded-columns="expandedChildColumns"
                />
            </div>
        </div>

        <div
            v-if="nestedLoop.PassThru !== undefined"
            class="content"
        >
            <h4>PassThru</h4>
            <div>
                <sql-string
                    :sql="nestedLoop.PassThru.ScalarOperator.ScalarString"
                    :expanded-columns="expandedChildColumns"
                />
            </div>
        </div>

        <div
            v-if="nestedLoop.OuterReferences !== undefined && nestedLoop.OuterReferences.length > 0"
            class="content"
        >
            <h4>Outer References</h4>
            <ul class="small">
                <li
                    v-for="(column, index) in nestedLoop.OuterReferences"
                    :key="index"
                >
                    <sql-string
                        :sql="column.toString()"
                        :expanded-columns="expandedChildColumns"
                    />
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang='ts'>
import {
    Vue, Component, Prop,
} from 'vue-property-decorator';
import { RelOp, NestedLoops, ExpandedComputedColumn } from 'showplan-js';
import SqlString from './SqlString.vue';

@Component({
    components: { SqlString },
})
export default class NestedLoopView extends Vue {
  @Prop() public operation!: RelOp;

  private get nestedLoop(): NestedLoops {
      return this.operation.Action as NestedLoops;
  }

  private get expandedChildColumns(): ExpandedComputedColumn[] {
      return this.operation.GetChildExpandedComputedColumns();
  }
}
</script>
