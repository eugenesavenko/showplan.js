import ShowPlanParser from '@/parser/showplan-parser';
import * as ShowPlan from '@/parser/showplan';
import { expect } from 'chai';
import * as fs from 'fs';

describe('simple-index-seek.sqlplan', () => {
    const file = 'tests/unit/plan-parser/plans/simple-index-seek.sqlplan';
    let plan: ShowPlan.ShowPlanXML;

    before(() => {
        const data = fs.readFileSync(file, 'utf16le');
        plan = ShowPlanParser.Parse(data);
    });

    it('can parse', () => {
        const statement = plan.Batches[0].Statements[0] as ShowPlan.StmtSimple;
        expect(statement.StatementSubTreeCost).to.equal(0.0032831);
        expect(statement.QueryPlan!.RelOp.EstimateIO).to.equal(0.003125);
        expect(statement.QueryPlan!.RelOp.EstimateCPU).to.equal(0.0001581);
        expect(statement.QueryPlan!.RelOp.PhysicalOp).to.equal('Clustered Index Seek');
        expect(statement.QueryPlan!.RelOp.LogicalOp).to.equal('Clustered Index Seek');
        expect(statement.QueryPlan!.RelOp.OutputList).to.have.length(20);

        const columnReference = statement.QueryPlan!.RelOp.OutputList[0];
        expect(columnReference.Database).to.equal('[StackOverflowMovies]');
        expect(columnReference.Schema).to.equal('[dbo]');
        expect(columnReference.Table).to.equal('[Posts]');
        expect(columnReference.Column).to.equal('Id');
        expect(columnReference.toString()).to.equal('[StackOverflowMovies].[dbo].[Posts].Id');

        const indexScan = statement.QueryPlan!.RelOp.Action as ShowPlan.IndexScan;
        expect(indexScan.Ordered).to.be.true;
        expect(indexScan.ScanDirection).to.equal('FORWARD');
    });
});
