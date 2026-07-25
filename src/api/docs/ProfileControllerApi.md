# ProfileControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getMyProfile**](#getmyprofile) | **GET** /api/profiles/me | |
|[**saveProfile**](#saveprofile) | **POST** /api/profiles | |

# **getMyProfile**
> object getMyProfile()


### Example

```typescript
import {
    ProfileControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileControllerApi(configuration);

const { status, data } = await apiInstance.getMyProfile();
```

### Parameters
This endpoint does not have any parameters.


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

# **saveProfile**
> object saveProfile(requestBody)


### Example

```typescript
import {
    ProfileControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileControllerApi(configuration);

let requestBody: { [key: string]: any; }; //

const { status, data } = await apiInstance.saveProfile(
    requestBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requestBody** | **{ [key: string]: any; }**|  | |


### Return type

**object**

### Authorization

[BearerAuthentication](../README.md#BearerAuthentication)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

