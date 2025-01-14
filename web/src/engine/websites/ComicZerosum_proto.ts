export const protoTypes = `
        package ComicZerosum;
        syntax = "proto3";

        //Common
        message Header {
          optional uint32 lastUpdateTime = 1;
          optional uint32 nextUpdateTime = 2;
        }

        //Mangas
        message Listview {
          optional Header header = 1;
          repeated Title titles = 3;
        }

        message Title {
          optional uint32 id = 1;
          optional string tag = 2;
          optional string name = 3;
          optional string nameKana = 4;
          optional string author = 5;
          optional string authorKana = 6;
          optional string description = 7;
          optional string imgUrl = 8;
          optional uint32 startTime = 9;
          optional uint32 endTime = 10;
          optional bool fanLetterEnable = 11;
          optional bool r18Flag = 12;
          optional Genres genres = 13;
          optional uint32 lastUpdateTime = 14;
          optional uint32 latestChapterId = 15;
        }

        message Genres {
          repeated Genre genre = 1;
        }

        message Genre {
          optional uint32 id = 1;
          optional string name = 2;
        }

        message IndependentBook {
          optional uint32 id = 1;
          optional uint32 titleId = 2;
          optional string name = 3;
          optional string imageUrl = 4;
          optional uint32 releaseTime = 5;
          optional uint32 startTime = 6;
          optional uint32 endTime = 7;
          optional StoreUrls storeUrls = 8;
        }

        message StoreUrls {
          repeated StoreUrl storeUrl = 1;
        }

        message StoreUrl {
          optional int32 store = 1;
          optional string url = 2;
        }

        //Chapter
        message TitleView {
          optional Header header = 1;
          optional Title title = 2;
          repeated Chapter chapters = 3;
          repeated IndependentBook independentBooks =  4;
          repeated TitleRelatedBanner titleRelatedBanners = 5;
          optional Sns sns = 6;
        }



        message Chapter {
          optional uint32 id = 1;
          optional string name = 2;
          optional string imageUrl = 3;
          optional uint32 startTime = 4;
          optional uint32 endTime = 5;
          optional string nextUpdateTime = 6;
          optional bool fanLetterEnabled = 7;
        }


        message TitleRelatedBanners {
          repeated TitleRelatedBanner titleRelatedBanners = 1;
        }

        message TitleRelatedBanner {
          optional string imageUrl = 1;
          optional string url = 2;
        }

        message Sns {
          optional string facebook = 1;
          optional string twitter = 2;
        }

        //Pages

        message MangaViewerView {
          optional int32 status = 1;
          optional uint32 titleId = 2;
          optional string titleTag = 3;
          optional string viewerTitle = 4;
          repeated MangaPage pages = 5;
        }

        message MangaPage {
          optional string imageUrl = 1;
          optional LastPage lastPage = 2;
        }

        message LastPage {
          optional uint32 t = 1;
        }
`;