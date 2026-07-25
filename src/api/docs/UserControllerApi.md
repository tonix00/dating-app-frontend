# UserControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**deleteUser**](#deleteuser) | **DELETE** /api/users/{id} | |
|[**getUserById**](#getuserbyid) | **GET** /api/users/{id} | |
|[**login**](#login) | **POST** /api/users/login | |
|[**register**](#register) | **POST** /api/users/register | |
|[**updateUser**](#updateuser) | **PUT** /api/users/{id} | |

# **deleteUser**
> object deleteUser()


### Example

```typescript
import {
    UserControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.deleteUser(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


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

# **getUserById**
> object getUserById()


### Example

```typescript
import {
    UserControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getUserById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


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

# **login**
> object login(requestBody)


### Example

```typescript
import {
    UserControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserControllerApi(configuration);

let requestBody: { [key: string]: string; }; //

const { status, data } = await apiInstance.login(
    requestBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requestBody** | **{ [key: string]: string; }**|  | |


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

# **register**
> object register(requestBody)


### Example

```typescript
import {
    UserControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserControllerApi(configuration);

let requestBody: { [key: string]: string; }; //

const { status, data } = await apiInstance.register(
    requestBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requestBody** | **{ [key: string]: string; }**|  | |


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

# **updateUser**
> object updateUser(requestBody)


### Example

```typescript
import {
    UserControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserControllerApi(configuration);

let id: number; // (default to undefined)
let requestBody: { [key: string]: string; }; //

const { status, data } = await apiInstance.updateUser(
    id,
    requestBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requestBody** | **{ [key: string]: string; }**|  | |
| **id** | [**number**] |  | defaults to undefined|


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

