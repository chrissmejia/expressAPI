import * as mocha from 'mocha';
import * as chai from 'chai';

import * as JSFiles from "../../source/core/lib/files";

const expect = chai.expect;

// ---------------------------------------------------------------------------------------------------------------
// JSloth Library.
// ---------------------------------------------------------------------------------------------------------------
let files = new JSFiles.Files();

describe('Lib Tests - Files', () => {

    // Async test
    it('File exists', done => {
        files.exists(__dirname + "/files.test.ts").then((exist) => {
            expect(exist).to.be.true;
            done();
        });
    });

    // Async test
    it('Fake file not exists', done => {
        files.exists(__dirname + "/files.test0.ts", false).catch((err) => {
            expect(err).to.exist;
            done();
        });
    });

});