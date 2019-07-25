import config from "../config";
export default {
  getClientIP: `${config.serverUrl}/api/clientIP`,
  registerUser: `${config.serverUrl}/api/users/register`,
  loginUser: `${config.serverUrl}/api/users/login`,  
  getAllUsers: `${config.serverUrl}/api/users/getAllUsers`,
  
  queryItem: `${config.serverUrl}/api/queryItem`,
  checkProductExists: `${config.serverUrl}/api/checkProductExists`,
  submitBOM: `${config.serverUrl}/api/submitBOM`,
  submitForecast: `${config.serverUrl}/api/submitForecast`,
  queryForecast: `${config.serverUrl}/api/queryForecast`,
  getBillData: `${config.serverUrl}/api/getBillData`,
  queryBill: `${config.serverUrl}/api/queryBill`,
  createUpdateVendor: `${config.serverUrl}/api/vendor/createUpdateVendor`,
  getAllVendor: `${config.serverUrl}/api/vendor/getAllVendors`,
  getVendorById: `${config.serverUrl}/api/vendor/getVendorById`,
  deleteVendor: `${config.serverUrl}/api/vendor/deleteVendor`,
  getSalesForecast: `${config.serverUrl}/api/forecast/getSalesForecast`,
  getSalesForecastById: `${config.serverUrl}/api/forecast/getSalesForecastById`,
  getForecastItemSummary: `${config.serverUrl}/api/forecast/getForecastItemSummary`,
  deleteSalesForecast: `${config.serverUrl}/api/forecast/deleteSalesForecast`,
  searchItemsByCategory: `${config.serverUrl}/api/item/searchItemsByCategory`,
  createUpdateForecast: `${config.serverUrl}/api/forecast/createUpdateForecast`,
  createUpdateBOM: `${config.serverUrl}/api/bom/createUpdateBOM`,
  getItemBOM: `${config.serverUrl}/api/bom/getItemBOM`,
  getNonSpecificBOM: `${config.serverUrl}/api/bom/getNonSpecificBOM`,
  getBOMLineById: `${config.serverUrl}/api/bom/getBOMLineById`,  
  deleteBOMLine: `${config.serverUrl}/api/bom/deleteBOMLine`,

  getAllSubtypes: `${config.serverUrl}/api/item/getAllSubtypes`,
  getSubtypeById: `${config.serverUrl}/api/item/getSubtypeById`,
  createUpdateSubType: `${config.serverUrl}/api/item/createUpdateSubType`,
  deleteSubType: `${config.serverUrl}/api/item/deleteSubType`,

  getAllMaterialTypes: `${config.serverUrl}/api/item/getAllMaterialTypes`,
  createUpdateMaterialType: `${
    config.serverUrl
    }/api/item/createUpdateMaterialType`,
  getMaterialTypeById: `${config.serverUrl}/api/item/getMaterialTypeById`,
  deleteMaterialType: `${config.serverUrl}/api/item/deleteMaterialType`,

  getAllItemCategories: `${config.serverUrl}/api/item/getAllCategories`,
  createUpdateCategory: `${config.serverUrl}/api/item/createUpdateCategory`,
  getCategoryById: `${config.serverUrl}/api/item/getCategoryById`,
  deleteCategory: `${config.serverUrl}/api/item/deleteCategory`,

  queryCompanies: `${config.serverUrl}/api/queryCompanies`,
  queryDepartments: `${config.serverUrl}/api/queryDepartments`,
  queryCategories: `${config.serverUrl}/api/queryCategories`,
  queryTypes: `${config.serverUrl}/api/queryTypes`,
  querySubtypes: `${config.serverUrl}/api/querySubtypes`,
  generateSequenceNumber: `${config.serverUrl}/api/generateSequenceNumber`,

  getAllDepartments: `${config.serverUrl}/api/home/getAllDepartments`
};
