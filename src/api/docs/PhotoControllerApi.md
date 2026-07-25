# PhotoControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**deletePhoto**](#deletephoto) | **DELETE** /api/photos/{photoNumber} | |
|[**uploadPhoto**](#uploadphoto) | **POST** /api/photos/upload/{photoNumber} | |

# **deletePhoto**
> object deletePhoto()


### Example

```typescript
import {
    PhotoControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PhotoControllerApi(configuration);

let photoNumber: number; // (default to undefined)

const { status, data } = await apiInstance.deletePhoto(
    photoNumber
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **photoNumber** | [**number**] |  | defaults to undefined|


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

# **uploadPhoto**
> object uploadPhoto()


### Example

```typescript
import {
    PhotoControllerApi,
    Configuration,
    UploadPhotoRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new PhotoControllerApi(configuration);

let photoNumber: number; // (default to undefined)
let uploadPhotoRequest: UploadPhotoRequest; // (optional)

const { status, data } = await apiInstance.uploadPhoto(
    photoNumber,
    uploadPhotoRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **uploadPhotoRequest** | **UploadPhotoRequest**|  | |
| **photoNumber** | [**number**] |  | defaults to undefined|


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

