describe('Smoke monitoring on tesla.com', () => {

  before(() => {
    browser.ActivatePerformanceAudit({
      networkThrottling: 'online'
    })
  })

  describe('Buy a MODEL X', () => {
    it('inject hero element measurement', function () {

      // configuration
      const configuration = {
        patterns: [{
          urlPattern: 'https://www.tesla.com*',
          resourceType: 'Document',
          requestStage: 'Response'
        }]
      }
    
      // rules
      const rules = [
        ['<head>', '<script>performance.mark(\'HE-start-head\')</script>\n<head>'],
        ['</head>', '</head>\n<script>performance.mark(\'HE-stop-head\')</script>'],
        ['<body', '<script>performance.mark(\'HE-start-body\')</script><body'],
        ['</html>', '<script>performance.mark(\'HE-stop-body\')</script>\n</html>']
        
      ]
    
      browser.InjectHeroElements(configuration, rules)
    
    });

    it('open', () => {
      browser.CoverageStart()
      browser.url('https://www.tesla.com/')
      const title = 'Electric Cars, Solar & Clean Energy | Tesla'
      const titleElm = $(`//title[contains(text(),"${title}")]`)
      browser.waitForloadEventEnd()
      browser.EvaluatePerformanceAudit()
      expect(titleElm.waitForExist({timeoutMsg: "Element title not found. The page couldn't be loaded in time."})).to.be.true
      browser.TakeCoverage('tesla')
    });
/*
    it('select and open model X', () => {
      const modelXElm = $('(//a[@href="/modelx"])[1]')
      modelXElm.waitForExist()
      modelXElm.click()

      const titleXElm = $('//title[contains(text(),"Model X | Tesla")]')
      titleXElm.waitForExist()
    });
 */
  });
/*
  describe('examples', () => {
    // example save object to elasticsearch
    it('save clients to elasticsearch', () => {
      let settings = {
        payload: {
          'firstname': 'Radim',
          'secondname': 'Daniel',
          'surname': 'Panek',
          'isSDET': true, 
          'clientsID': Math.floor(Math.random() * 100)
        }, 
        indexName: 'clients',
      }
      browser.SaveToElastic(settings)
    });

    it('save memory', () => {
      const memory = browser.execute(() => {
        return performance.memory
      })
      let settings = {
        payload: memory, 
        indexName: 'memory-demo',
      }
      browser.SaveToElastic(settings)
    });

    it('save tesla showcase sections', () => {
      const sectionsList = browser.execute(() => {
        return document.querySelectorAll('section.feature')
      })

      let d = new Date();
      let datestringIndex = d.getFullYear() + "." + ("0"+(d.getMonth()+1)).slice(-2) + "." + ("0" + d.getDate()).slice(-2);

      let settings = {
        payload: {
          sections: sectionsList.length
        }, 
        indexName: `tesla-sections-${datestringIndex}`,
      }
      browser.SaveToElastic(settings)
    });

    // example use additional configuration
    it('test config', () => {
      console.log(browser.config.secretKey)
    });
  });
  */
})