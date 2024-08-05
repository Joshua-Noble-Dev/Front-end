import axios from "axios";
import { Band } from "../../../src/models/Band";
import { baseURL, getBands } from "../../../src/services/BandService";
import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";

const bands: Band = {
    bandID: 1,
    bandName: "Entry"
}

const mock = new MockAdapter(axios);

describe('BandService', function () {

    describe('getBands', function () {

      it('should return bands from response', async () => {
        const data = [bands];

        mock.onGet(baseURL).reply(200, data);

        const results = await getBands();

        expect(results[0].bandID).to.deep.equal(bands.bandID);
        expect(results[0].bandName).to.deep.equal(bands.bandName);

      })
        it('should return Failed to get Bands when error returned from axios', async () => {
    
            mock.onGet(baseURL).reply(500);

            try {
                await getBands();
                throw new Error('Error not thrown');
              } catch (e) {
                expect(e.message).to.equal('Failed to get bands');
                return;
              }
        })

      })

})