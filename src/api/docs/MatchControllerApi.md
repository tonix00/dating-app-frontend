# MatchControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getMyMatches**](#getmymatches) | **GET** /api/matches/my-matches | |
|[**likeUser**](#likeuser) | **POST** /api/matches/like/{likedUserId} | |

# **getMyMatches**
> object getMyMatches()


### Example

```typescript
import {
    MatchControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MatchControllerApi(configuration);

const { status, data } = await apiInstance.getMyMatches();
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

# **likeUser**
> object likeUser()


### Example

```typescript
import {
    MatchControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MatchControllerApi(configuration);

let likedUserId: number; // (default to undefined)

const { status, data } = await apiInstance.likeUser(
    likedUserId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **likedUserId** | [**number**] |  | defaults to undefined|


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

