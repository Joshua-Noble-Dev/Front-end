import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { JobRolesResponse } from "../../../src/models/JobRolesResponse";
import { getJobRoles, URL } from "../../../src/services/JobRoleService";


const testDate = new Date(1721718000000);

const jobRolesResponse: JobRolesResponse = {
    id: 1,
    roleName: "TechLead",
    location: "Belfast",
    capabilityID: 1,
    bandID: 2,
    closingDate: testDate,
    status: "open"
}

const mock = new MockAdapter(axios);

describe('JobRoleService', function () {
    describe('getJobRoles', function () {
      it('should return jobRoles from response', async () => {
        const data = [jobRolesResponse];

        mock.onGet(URL).reply(200, data);

        const results = await getJobRoles();

        expect(results[0].id).to.deep.equal(jobRolesResponse.id);
        expect(results[0].bandID).to.deep.equal(jobRolesResponse.bandID);
        expect(results[0].capabilityID).to.deep.equal(jobRolesResponse.capabilityID);
        expect(results[0].closingDate).to.deep.equal(jobRolesResponse.closingDate.toISOString());
        expect(results[0].location).to.deep.equal(jobRolesResponse.location);
        expect(results[0].roleName).to.deep.equal(jobRolesResponse.roleName);
        expect(results[0].status).to.deep.equal(jobRolesResponse.status);
      })

      it('should throw exception when 500 error returned from axios', async () => {
        mock.onGet(URL).reply(500);

        try {
          await getJobRoles();
          throw new Error('Error not thrown');
        } catch (e) {
          expect(e.message).to.equal('Failed to get Job Roles');
          return;
        }
      })
    })
})