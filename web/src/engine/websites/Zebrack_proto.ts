export const protoTypes = `
package Zebrack;
syntax = "proto3";

message Response {
  optional TitleDetailView titleDetailView = 21;
  optional MagazineViewerView magazineViewerView = 32;
  optional VolumeListView volumeListView = 100;
}

message TitleDetailView {
  optional uint32 titleId = 1;
  optional string titleName = 2;
}

message ImageV3 {
  optional string imageUrl = 1;
  optional string encryptionKey = 2;
}

message Image {
  optional string imageUrl = 1;
  optional string encryptionKey = 3;
}

// Chapter

message TitleChapterListViewV3 {
  optional uint32 titleId = 1;
  repeated ChapterGroupV3 groups = 4;
  optional string titleName = 7;
}

message ChapterViewerViewV3 {
  repeated ChapterPageV3 pages = 1;
}

message ChapterGroupV3 {
  optional uint32 volumeId = 2;
  repeated ChapterV3 chapters = 3;
}

message ChapterPageV3 {
  optional ImageV3 image = 1;
}

message ChapterV3 {
  optional uint32 id = 1;
  optional uint32 titleId = 2;
  optional string mainName = 3;
}

// Volume

message VolumeListView {
  repeated Volume volumes = 2;
}

message VolumeViewerViewV3 {
  repeated VolumePageV3 pages = 1;
}

message VolumePageV3 {
  optional ImageV3 image = 1;
}

message Volume { 
  optional uint32 titleId = 2;
  optional uint32 volumeId = 3;
  optional string titleName = 4;
  optional string volumeName = 5;
}


// Magazine

message MagazineDetailViewV3 {
  optional MagazineIssue magazine = 3;
}

message MagazineViewerView {
  repeated Image images = 1;
}

message MagazineIssue {
  optional string magazineName = 3;
  optional string issueName = 4;
}

// Gravure

message GravureDetailViewV3 {
  optional GravureV3 gravure = 1;
}

message GravureViewerViewV3 {
  repeated ImageV3 images = 2;
}

message GravureV3 {
  optional string name = 2;
}


`;