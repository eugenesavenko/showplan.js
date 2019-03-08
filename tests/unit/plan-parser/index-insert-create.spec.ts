import ShowPlanParser from '@/parser/showplan-parser';
import * as ShowPlan from '@/parser/showplan';
import { expect } from 'chai';
import * as fs from 'fs';

describe('index-insert-create.sqlplan', () => {
    it('can parse', () => {
        const file = 'tests/unit/plan-parser/plans/index-insert-create.sqlplan';
        const data = fs.readFileSync(file, 'utf16le');
        const plan = ShowPlanParser.Parse(data);

        const showplan = plan.Batches[0].Statements[0] as ShowPlan.StmtSimple;
        const op = showplan.QueryPlan!.RelOp;
        expect(op.LogicalOp).to.equal('Insert');
        expect(op.PhysicalOp).to.equal('Index Insert');

        const createIndex = op.Action as ShowPlan.CreateIndex;
        expect(createIndex.Object).to.have.length(1);
        expect(createIndex.Object[0].Index).to.equal('[IX_WikiPostId]');
        expect(createIndex.Object[0].IndexKind).to.equal('NonClustered');
    });
});
