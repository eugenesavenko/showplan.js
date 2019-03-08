import ShowPlanParser from '@/parser/showplan-parser';
import * as ShowPlan from '@/parser/showplan';
import { expect } from 'chai';
import * as fs from 'fs';

describe('simple-update.sqlplan', () => {
    const file = 'tests/unit/plan-parser/plans/simple-update.sqlplan';
    let plan: ShowPlan.ShowPlanXML;

    before(() => {
        const data = fs.readFileSync(file, 'utf16le');
        plan = ShowPlanParser.Parse(data);
    });

    it('can parse', () => {
        const statement = plan.Batches[0].Statements[0] as ShowPlan.StmtSimple;
        const queryplan = statement.QueryPlan!;
        expect(queryplan.RelOp.PhysicalOp).to.equal('Clustered Index Update');
        expect(queryplan.RelOp.LogicalOp).to.equal('Update');
        expect(queryplan.RelOp.Action).to.be.instanceof(ShowPlan.SimpleUpdate);
    });
});
