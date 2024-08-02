import axios from "axios";
import { Band } from "../../../src/models/Band";
import { getBands } from "../../../src/services/BandService";
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
  
          mock.onGet("http://localhost:8080/api/bands").reply(200, data);
  
          const results = await getBands();

          console.log(results[0].bandID);
          console.log(results[0].bandName);
  
          expect(results[0].bandID).to.deep.equal(bands.bandID);
          expect(results[0].bandName).to.deep.equal(bands.bandName);
        })
  
        it('should return Failed to get Bands when error returned from axios', async () => {
    
            mock.onGet("http://localhost:8080/api/bands").reply(500);

            try {
                await getBands();
                throw new Error('Error not thrown');
              } catch (e) {
                expect(e.message).to.equal('Failed to get bands');
                return;
              }
        })

      })

});