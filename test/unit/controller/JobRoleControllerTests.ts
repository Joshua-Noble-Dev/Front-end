import * as JobRoleService from "../../../src/services/JobRoleService";
import * as BandService from "../../../src/services/BandService";
import * as CapabilityService from "../../../src/services/CapabilityService";
import { expect } from 'chai';
import { JobRolesResponse } from "../../../src/models/JobRolesResponse";
import sinon from 'sinon';
import * as RoleController from "../../../src/controllers/RoleController";
import { Band } from "../../../src/models/Band";
import { Capability } from "../../../src/models/Capability";

const testDate = new Date(1721718000000);

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

const bands: Band = {
  bandID: 1,
  bandName: "Entry"
}

const capabilities: Capability = {
  capabilityID: 1,
  capabilityName: "Engineering"
} 

describe('RoleController', function () {
  afterEach(() => {
    sinon.restore();
  });

  describe('getJobRoles', function () {
    it('should render view with job roles when job roles returned', async () => {
      const jobRolesList = [jobRolesResponse];

      const stub = sinon.stub(JobRoleService, 'getJobRoles').resolves(jobRolesList);

      const req = {};
      const res = { render: sinon.spy() };

      await RoleController.getAllJobRoles(req as any, res as any); // eslint-disable-line  @typescript-eslint/no-explicit-any


      expect(res.render.calledOnce).to.be.true;
      expect(res.render.calledWith('jobRolesList.html', { baseURL: process.env.AWS_URL || 'http://localhost:3000', roles: jobRolesList })).to.be.true;

      stub.restore;
    });

    it('should render view with error message when error thrown', async () => {
      const errorMessage: string = 'Error message';
      sinon.stub(JobRoleService, 'getJobRoles').rejects(new Error(errorMessage));

      const req = {};
      const res = { render: sinon.spy(), locals: { errormessage: '' } };

      await RoleController.getAllJobRoles(req as any, res as any); // eslint-disable-line  @typescript-eslint/no-explicit-any

      expect(res.render.calledOnce).to.be.true;
      expect(res.render.calledWith('jobRolesList.html')).to.be.true;
      expect(res.locals.errormessage).to.equal(errorMessage);
    });
  });

  describe('getSingleJobRole', function () {

    it('should render view with a single job role when job role is returned', async () => {

      const returnJobRole = jobRolesResponse;

      const stub = sinon.stub(JobRoleService, 'getJobRoleById').resolves(returnJobRole);

      const req = { params: 1 };
      const res = { render: sinon.spy() };

      await RoleController.getSingleJobRole(req as any, res as any); // eslint-disable-line  @typescript-eslint/no-explicit-any


      expect(res.render.calledOnce).to.be.true;
      expect(res.render.calledWith('jobRoleDetail.html', { baseURL: process.env.AWS_URL || 'http://localhost:3000', jobRole: returnJobRole })).to.be.true;

      stub.restore;
    });

    it('should render view with error message when error thrown', async () => {

      const errorMessage: string = 'Error message';

      sinon.stub(JobRoleService, 'getJobRoleById').rejects(new Error(errorMessage));

      const req = { params: 1 };
      const res = { render: sinon.spy(), locals: { errormessage: '' } };

      await RoleController.getSingleJobRole(req as any, res as any); // eslint-disable-line  @typescript-eslint/no-explicit-any

      expect(res.render.calledOnce).to.be.true;
      expect(res.render.calledWith('jobRolesList.html')).to.be.true;
      expect(res.locals.errormessage).to.equal(errorMessage);
    });


  })

  describe('postJobRoleForm', function () {

    it('should redirect to jobRole/id when id is returned', async () => {

      const id = 1;

      sinon.stub(JobRoleService, 'createJobRole').resolves(id);

      const req = { body: id };
      const res = { redirect: sinon.spy() };

      await RoleController.postJobRoleForm(req as any, res as any); // eslint-disable-line  @typescript-eslint/no-explicit-any

      expect(res.redirect.calledOnce).to.be.true;
      expect(res.redirect.calledWith('/jobRoles/' + id)).to.be.true;

    });

    it('should render JobRoleForm when error is returned', async () => {

      const errorMessage: string = 'Error message';

      sinon.stub(JobRoleService, 'createJobRole').rejects(new Error(errorMessage));

      const req = {};
      const res = { render: sinon.spy(), locals: { errormessage: '' } };

      await RoleController.postJobRoleForm(req as any, res as any); // eslint-disable-line  @typescript-eslint/no-explicit-any


      expect(res.render.calledOnce).to.be.true;
      expect(res.render.calledWith('jobRoleForm.html')).to.be.true;
      expect(res.locals.errormessage).to.equal(errorMessage);

    });

  });

  describe('getJobRoleForm', function () {

    it('should render jobRole form', async () => {

      const bandList = [bands];
      const stubBand = sinon.stub(BandService, 'getBands').resolves(bandList);

      const capabilityList = [capabilities];
      const stubCap = sinon.stub(CapabilityService, 'getCapabilities').resolves(capabilityList);

      const req = { };
      const res = { render: sinon.spy() };

      await RoleController.getJobRoleForm(req as any, res as any); // eslint-disable-line  @typescript-eslint/no-explicit-any

      expect(res.render.calledOnce).to.be.true;
      expect(res.render.calledWith('jobRoleForm.html', {bands: bandList, capabilities: capabilityList})).to.be.true;

      stubBand.restore;
      stubCap.restore;

    });
  });
});