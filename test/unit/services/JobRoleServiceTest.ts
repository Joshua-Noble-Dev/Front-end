import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { JobRolesResponse } from "../../../src/models/JobRolesResponse";
import { createJobRole, getJobRoleById, getJobRoles, URL } from "../../../src/services/JobRoleService";
import { JobRoleRequest } from "../../../src/models/JobRoleRequest";

const testDate = new Date();

const jobRolesResponse: JobRolesResponse = {
    id: 1,
    roleName: "TechLead",
    location: "Belfast",
    capabilityName: "engineering",
    bandName: "placement",
    closingDate: testDate,
    status: "open",
    description: "Description",
    responsibilities: "Responsibilities",
    jobSpec: "jobSpecLink"
}

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

const mock = new MockAdapter(axios);
const token = "sample-token";

describe('JobRoleService', function () {
    describe('getJobRoles', function () {
      it('should return jobRoles from response', async () => {
        const data = [jobRolesResponse];
        

        console.log(URL)
        mock.onGet(URL).reply(200, data);

        const results = await getJobRoles(token);

        expect(results[0].id).to.deep.equal(jobRolesResponse.id);
        expect(results[0].bandName).to.deep.equal(jobRolesResponse.bandName);
        expect(results[0].capabilityName).to.deep.equal(jobRolesResponse.capabilityName);
        expect(results[0].closingDate).to.deep.equal(jobRolesResponse.closingDate.toISOString());
        expect(results[0].location).to.deep.equal(jobRolesResponse.location);
        expect(results[0].roleName).to.deep.equal(jobRolesResponse.roleName);
        expect(results[0].status).to.deep.equal(jobRolesResponse.status);
      })

      it('should throw exception when 500 error returned from axios', async () => {
        mock.onGet(URL).reply(500);

        try {
          await getJobRoles(token);
          throw new Error('Error not thrown');
        } catch (e) {
          expect(e.message).to.equal('Failed to get Job Roles');
          return;
        }
      })
    })

    describe('getJobRoleById', function () {

      it('should return a jobRole when axios returns a jobRole', async () => {

        const data = jobRolesResponse;

        mock.onGet(URL + "1").reply(200, data);

        const result = await getJobRoleById("1", "token");

        expect(result.id).to.deep.equal(jobRolesResponse.id);
        expect(result.bandName).to.deep.equal(jobRolesResponse.bandName);
        expect(result.capabilityName).to.deep.equal(jobRolesResponse.capabilityName);
        expect(result.closingDate).to.deep.equal(jobRolesResponse.closingDate.toISOString());
        expect(result.location).to.deep.equal(jobRolesResponse.location);
        expect(result.roleName).to.deep.equal(jobRolesResponse.roleName);
        expect(result.status).to.deep.equal(jobRolesResponse.status);
        expect(result.description).to.deep.equal(jobRolesResponse.description);
        expect(result.responsibilities).to.deep.equal(jobRolesResponse.responsibilities);
        expect(result.jobSpec).to.deep.equal(jobRolesResponse.jobSpec);
      })

      it('should throw Failed to get Job Role error when 500 error returned from axios', async () => {
        mock.onGet(URL + "1").reply(500);

      try {
        await getJobRoleById("1", "token");
      } catch (e) {
        expect(e.message).to.equal('Failed to get Job Role');
        return;
      }

      })

      it('should throw Job Role does not exist error when 404 error returned from axios', async () => {
        mock.onGet(URL + "1").reply(404);

      try {
        await getJobRoleById("1", "token");
      } catch (e) {
        expect(e.message).to.equal('Job Role does not exist');
        return;
      }

      })

    })

    describe('createJobRole', function () {

      it('should return an id when axios returns a id', async () => {

        mock.onPost(URL).reply(201,1);

        const result = await createJobRole(jobRoleRequest, "token");

        expect(result).to.deep.equal(1);

      })

      it('should return Could not create job role error when axios returns 500 error', async () => {
        mock.onPost(URL).reply(500);

      try {
        await createJobRole(jobRoleRequest, "token");
      } catch (e) {
        expect(e.message).to.equal('Could not create job role');
        return;
      }

      })

      it('should throw relevant error when 400 error returned from axios', async () => {
        mock.onPost(URL).reply(400);

      try {
        await createJobRole(jobRoleRequest, "token");
      } catch (e) {
        expect(e.message).to.equal('Invalid data');
        return;
      }

      })

    })

})