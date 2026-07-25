# DiscoveryControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**discoverUsers**](#discoverusers) | **GET** /api/discovery | |

# **discoverUsers**
> object discoverUsers()


### Example

```typescript
import {
    DiscoveryControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DiscoveryControllerApi(configuration);

let page: number; // (optional) (default to 0)

const { status, data } = await apiInstance.discoverUsers(
    page
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to 0|


### Return type

**object**

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

