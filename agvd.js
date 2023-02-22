import fetch from "node-fetch";

class Agvd{
  /*
  * The class implements the functionality that allow a user
  * to make a query to the african genome variation database
  *
  * */

  login(params){
    /**
     * The function accepts the following arguments:
     * @param {Object} params - Allowed arguments
     * @param {String} params.user - Unique user-id
     * @param {String} params.password - User's password
     *
     * Example:
     *  user: "johndoe"
     *  password: "Password1@"
     */
    return this.request('login', params)
  }

  signup(params){
    /**
     * The function accepts the following arguments:
     * @param {Object} params - Allowed Arguments
     * @param {String} params.name - A user's Full Name
     * @param {String} params.id - A unique username that will be used as a user-id when login in
     * @param {String} params.email - A User's email
     * @param {String} params.password - A Users Password; Must contain at least 8 characters, mixed-case characters, a numerical character and a special character
     * @param {String} params.organization - An organization to which a user is affiliated to
     *
     * Example:
     *  name: "John Doe"
     *  id: "JDoe"
     *  email: "john.doe@email.com"
     *  password: "Password1@"
     *  organization: "H3ABionet"
     */

    return this.request('signup', params)
  }

  query(params){
    /**
     * The function accepts the following allowed arguments:
     * @param {Object} params - Allowed arguments
     * @param {String} params.token - A token supplied after user login; If user doesn't want to log in first before making the query, the user can append their user-id and password as keyword parameters in the query function
     * @param {String} params.user - unique user-id
     * @param {String} params.password - user password
     * @param {String} params.id - List of IDs, these can be rs IDs (dbSNP) or variants in the format chrom:start:ref:alt
     * @param {String} params.region - List of regions, these can be just a single chromosome name or regions in the format <chromosome>:<start>-<end>
     * @param {String} params.type - List of types, accepted values are SNV, MNV, INDEL, SV, CNV, INSERTION, DELETION
     * @param {String} params.gene - List of genes, most gene IDs are accepted (HGNC, Ensembl gene, ...)
     * @param {String} params.sample - Filter variants where the samples contain the variant (HET or HOM_ALT). Accepts AND ( ; ) and OR ( , ) operators
     * @param {String} params.cohort - Select variants with calculated stats for the selected cohorts
     * @param {String} params.cohortStatsRef - Reference Allele Frequency for a specific cohort, example: ALL>0.6
     * @param {String} params.cohortStatsAlt - Alternate Allele Frequency: {cohort}[<|>|<=|>={number}
     * @param {String} params.cohortStatsMaf - Minor Allele Frequency: {cohort}[<|>|<=|>={number}
     * @param {String} params.cohortStatsMgf - Minor Genotype Frequency: {cohort}[<|>|<=|>={number}
     * @param {String} params.clinicalSignificance - Clinical significance: benign, likely_benign, likely_pathogenic, pathogenic
     */
 return this.request('variant',params)
  }

   request(endpoint,params){
    return fetch(
      `https://agvd-rps.h3abionet.org/agvd/${endpoint}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }
    )
      .then(res => res.text())
      // .then(handle => console.log(handle))
      .catch(e => console.error(e))
  }
}

export default Agvd
