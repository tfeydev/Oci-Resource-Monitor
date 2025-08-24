// This controller is lean and delegates all tasks to the ObjectStorageService.

package techthor.ocimonitor.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import techthor.ocimonitor.service.ObjectStorageService;

import java.util.List;

@RestController
@RequestMapping("/api/storage")
public class ObjectStorageController {

    private final ObjectStorageService service;

    // The controller injects the service via the constructor
    public ObjectStorageController(ObjectStorageService service) {
        this.service = service;
    }

    // Returns all bucket names
    @GetMapping("/buckets")
    public List<String> listBuckets() {
        return service.getAllBucketNames();
    }

    // Returns object names in a specific bucket
    @GetMapping("/buckets/{bucket}/objects")
    public List<String> listObjects(@PathVariable String bucket) {
        return service.getObjectNamesFromBucket(bucket);
    }
}
