import { assert, expect } from 'chai';
import { validateJobRoleRequest } from '../../../src/validators/JobRoleValidator';
import { JobRoleRequest } from '../../../src/models/JobRoleRequest'

const testDate = new Date();

describe('JobRoleValidator', function () {
    describe('validateJobRoleRequest', function () {
        it('should not throw any error message', () => {
            const jobRoleRequest: JobRoleRequest = {
                roleName: "roleName",
                location: "location",
                capabilityID: 1,
                bandID: 1,
                closingDate: testDate,
                description: "description",
                responsibilities: "responsibilities",
                jobSpec: "jobSpec",
                positions: 2
            }

            try {
                validateJobRoleRequest(jobRoleRequest);
            } catch (e) {
                assert.fail("Expected no error message");
            }

        })

        it('should return error when roleName too long', () => {
            const jobRoleRequest: JobRoleRequest = {
                roleName: "roleName".repeat(20),
                location: "location",
                capabilityID: 1,
                bandID: 1,
                closingDate: testDate,
                description: "description",
                responsibilities: "responsibilities",
                jobSpec: "jobSpec",
                positions: 2
            }

            try {
                validateJobRoleRequest(jobRoleRequest);
            } catch (e) {
                expect(e.message).to.equal("Invalid Role Name");
                return;
            }
            
            assert.fail("Expected error message");
        })

        it('should return error when roleName empty', () => {
            const jobRoleRequest: JobRoleRequest = {
                roleName: "",
                location: "location",
                capabilityID: 1,
                bandID: 1,
                closingDate: testDate,
                description: "description",
                responsibilities: "responsibilities",
                jobSpec: "jobSpec",
                positions: 2
            }

            try {
                validateJobRoleRequest(jobRoleRequest);
            } catch (e) {
                expect(e.message).to.equal("Invalid Role Name");
                return;
            }
            
            assert.fail("Expected error message");
        })

        it('should return error when location too long', () => {
            const jobRoleRequest: JobRoleRequest = {
                roleName: "roleName",
                location: "location".repeat(30),
                capabilityID: 1,
                bandID: 1,
                closingDate: testDate,
                description: "description",
                responsibilities: "responsibilities",
                jobSpec: "jobSpec",
                positions: 2
            }

            try {
                validateJobRoleRequest(jobRoleRequest);
            } catch (e) {
                expect(e.message).to.equal("Invalid Location");
                return;
            }

            assert.fail("Expected error message");

        })

        it('should return error when location empty', () => {
            const jobRoleRequest: JobRoleRequest = {
                roleName: "roleName",
                location: "",
                capabilityID: 1,
                bandID: 1,
                closingDate: testDate,
                description: "description",
                responsibilities: "responsibilities",
                jobSpec: "jobSpec",
                positions: 2
            }

            try {
                validateJobRoleRequest(jobRoleRequest);
            } catch (e) {
                expect(e.message).to.equal("Invalid Location");
                return;
            }

            assert.fail("Expected error message");

        })

        it('should return error when jobSpec too long', () => {
            const jobRoleRequest: JobRoleRequest = {
                roleName: "roleName",
                location: "location",
                capabilityID: 1,
                bandID: 1,
                closingDate: testDate,
                description: "description",
                responsibilities: "responsibilities",
                jobSpec: "jobSpec".repeat(20),
                positions: 2
            }

            try {
                validateJobRoleRequest(jobRoleRequest);
            } catch (e) {
                expect(e.message).to.equal("Invalid Job Specification Link");
                return;
            }

            assert.fail("Expected error message");

        })

        it('should return error when jobSpec empty', () => {
            const jobRoleRequest: JobRoleRequest = {
                roleName: "roleName",
                location: "location",
                capabilityID: 1,
                bandID: 1,
                closingDate: testDate,
                description: "description",
                responsibilities: "responsibilities",
                jobSpec: "",
                positions: 2
            }

            try {
                validateJobRoleRequest(jobRoleRequest);
            } catch (e) {
                expect(e.message).to.equal("Invalid Job Specification Link");
                return;
            }

            assert.fail("Expected error message");

        })

        it('should return error when description too long', () => {
            const jobRoleRequest: JobRoleRequest = {
                roleName: "roleName",
                location: "location",
                capabilityID: 1,
                bandID: 1,
                closingDate: testDate,
                description: "description".repeat(50),
                responsibilities: "responsibilities",
                jobSpec: "jobSpec",
                positions: 2
            }

            try {
                validateJobRoleRequest(jobRoleRequest);
            } catch (e) {
                expect(e.message).to.equal("Invalid Description length");
                return;
            }

            assert.fail("Expected error message");

        })

        it('should return error when description empty', () => {
            const jobRoleRequest: JobRoleRequest = {
                roleName: "roleName",
                location: "location",
                capabilityID: 1,
                bandID: 1,
                closingDate: testDate,
                description: "",
                responsibilities: "responsibilities",
                jobSpec: "jobSpec",
                positions: 2
            }

            try {
                validateJobRoleRequest(jobRoleRequest);
            } catch (e) {
                expect(e.message).to.equal("Invalid Description length");
                return;
            }

            assert.fail("Expected error message");

        })

        it('should return error when responsibilities too long', () => {
            const jobRoleRequest: JobRoleRequest = {
                roleName: "roleName",
                location: "location",
                capabilityID: 1,
                bandID: 1,
                closingDate: testDate,
                description: "description",
                responsibilities: "responsibilities".repeat(30),
                jobSpec: "jobSpec",
                positions: 2
            }

            try {
                validateJobRoleRequest(jobRoleRequest);
            } catch (e) {
                expect(e.message).to.equal("Invalid Resposibilities length");
                return;
            }

            assert.fail("Expected error message");

        })

        it('should return error when responsibilities empty', () => {
            const jobRoleRequest: JobRoleRequest = {
                roleName: "roleName",
                location: "location",
                capabilityID: 1,
                bandID: 1,
                closingDate: testDate,
                description: "description",
                responsibilities: "",
                jobSpec: "jobSpec",
                positions: 2
            }

            try {
                validateJobRoleRequest(jobRoleRequest);
            } catch (e) {
                expect(e.message).to.equal("Invalid Resposibilities length");
                return;
            }

            assert.fail("Expected error message");

        })

        it('should return error when positions too small', () => {
            const jobRoleRequest: JobRoleRequest = {
                roleName: "roleName",
                location: "location",
                capabilityID: 1,
                bandID: 1,
                closingDate: testDate,
                description: "description",
                responsibilities: "responsibilities",
                jobSpec: "jobSpec",
                positions: -1
            }

            try {
                validateJobRoleRequest(jobRoleRequest);
            } catch (e) {
                expect(e.message).to.equal("Position must be greater than 0");
                return;
            }

            assert.fail("Expected error message");

        })

        it('should return error when positions too big', () => {
            const jobRoleRequest: JobRoleRequest = {
                roleName: "roleName",
                location: "location",
                capabilityID: 1,
                bandID: 1,
                closingDate: testDate,
                description: "description",
                responsibilities: "responsibilities",
                jobSpec: "jobSpec",
                positions: 100
            }

            try {
                validateJobRoleRequest(jobRoleRequest);
            } catch (e) {
                expect(e.message).to.equal("Position number too high");
                return;
            }

            assert.fail("Expected error message");

        })

        it('should return error when date before today', () => {
            const jobRoleRequest: JobRoleRequest = {
                roleName: "roleName",
                location: "location",
                capabilityID: 1,
                bandID: 1,
                closingDate: new Date(1000000000000),
                description: "description",
                responsibilities: "responsibilities",
                jobSpec: "jobSpec",
                positions: 2
            }

            try {
                validateJobRoleRequest(jobRoleRequest);
            } catch (e) {
                expect(e.message).to.equal("Invalid Closing Date");
                return;
            }

            assert.fail("Expected error message");

        })


    })
})